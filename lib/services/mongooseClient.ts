import mongoose, { ConnectionStates } from "mongoose";

const {
  MONGODB_USERNAME: user,
  MONGODB_PASSWORD: password,
  MONGODB_HOST: host,
  MONGODB_DB: db,
} = process.env;

const connectionString = `mongodb+srv://${user}:${password}@${host}/${db}?retryWrites=true&w=majority`;

const mongooseClient = {
  connect: async () => {
    if (
      mongoose.connection.readyState === mongoose.ConnectionStates.connected
    ) {
      return;
    }

    await mongoose.connect(connectionString);
  },

  disconnect: async () => {
    if (mongoose.connection.readyState !== ConnectionStates.disconnected) {
      await mongoose.disconnect();
    }
  },

  runWithConnection: async <T>(operation: () => Promise<T>): Promise<T> => {
    await mongooseClient.connect();
    return operation();
  },
};

export default mongooseClient;
