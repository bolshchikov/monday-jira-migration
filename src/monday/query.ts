const gql = String.raw;

export const getAllBoardTasksQuery = gql`
  query getAllBoardTasks($boardId: Int, $page: Int) {
    boards(ids: [$boardId]) {
      name
      items (limit: 25, page: $page) {
        name
        state
        creator {
          email
        }
        column_values {
          text 
          title
        }
        updates {
          body
        }
        subitems {
          name
          state
          creator {
            email
          }
          column_values {
            text 
            title
          }
          updates {
            body
          }   
        }
      }
    }
  }
`;