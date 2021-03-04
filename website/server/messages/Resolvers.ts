export const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        // const users = await axios.get("https://api.github.com/users");
        // return users.data.map(({id, login, avatar_url}) => ({
        //   id,
        //   login,
        //   avatar_url
        // }));
        return [
          {
            id: 'test-id',
            login: 'test-login',
            avatar_url: null
          }
        ]
      } catch (error) {
        throw error
      }
    },
    getUser: async (_, args) => {
      try {
        // const user = await axios.get(
        //   `https://api.github.com/users/${args.name}`
        // );
        // return {
        //   id: user.data.id,
        //   login: user.data.login,
        //   avatar_url: user.data.avatar_url
        // };
        return {
          id: 'test-id',
          login: 'test-login',
          avatar_url: null
        }
      } catch (error) {
        throw error
      }
    }
  }
};