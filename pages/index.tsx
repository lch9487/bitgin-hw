import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { initializeApollo } from "../apollo/client";

const styles = {
  textDecoration: {
    textDecoration: "line-through",
  },
};

const GET_TODOS = gql`
  query {
    todos {
      id
      title
      completed
    }
  }
`;

const CREATE_TODO = gql`
  mutation ($title: String!) {
    createTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

const UPDATE_TODO = gql`
  mutation ($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      id
      title
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation ($id: ID!) {
    deleteTodo(id: $id)
  }
`;

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCreateTodo = () => {
    const title = prompt("Enter a title for the new todo:");
    if (title) {
      createTodo({
        variables: { title },
      });
    }
  };

  const handleUpdateTodo = (id, completed) => {
    updateTodo({
      variables: { id, completed: !completed },
    });
  };

  const handleDeleteTodo = (id) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteTodo({
        variables: { id },
      });
    }
  };

  return (
    <Box maxWidth="800px" p={2}>
      <Button variant="contained" onClick={handleCreateTodo}>
        Create Todo
      </Button>
      <List sx={{ mt: 2 }}>
        {data.todos.map((todo) => (
          <ListItem key={todo.id} disablePadding>
            <ListItemButton
              onClick={() => handleUpdateTodo(todo.id, todo.completed)}
            >
              <Checkbox checked={todo.completed} />
              <ListItemText
                primary={todo.title}
                sx={todo.completed ? styles.textDecoration : {}}
              />
            </ListItemButton>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_TODOS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default TodoList;
