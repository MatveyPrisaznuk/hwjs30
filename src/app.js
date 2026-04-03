const delay = (ms) => {
  const promise = new Promise((success) => {
    setTimeout(() => {
      success(ms);
    }, ms);
  });

  return promise;
};
const logger = (time) => console.log(`Resolved after ${time}ms`);

delay(2000).then(logger);
delay(1000).then(logger);
delay(1500).then(logger);

// ------------------------------

const users = [
  { name: "Mango", active: true },
  { name: "Poly", active: false },
  { name: "Ajax", active: true },
  { name: "Lux", active: false },
];

const toggleUserState = (allUsers, userName) => {
  return new Promise((success) => {
    const updatedUsers = allUsers.map((user) =>
      user.name === userName ? { ...user, active: !user.active } : user,
    );
    success(updatedUsers);
  });
};

const newLogger = (updatedUsers) => console.table(updatedUsers);


toggleUserState(users, "Mango").then(newLogger);
toggleUserState(users, "Lux").then(newLogger);


// --------------------------------

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = (transaction) => {
  const promise = new Promise((onSuccess, onError) => {
    const delay = randomIntegerFromInterval(200, 500);

    setTimeout(() => {
      const canProcess = Math.random() > 0.3;

      if (canProcess) {
        onSuccess(transaction.id, delay);
      } else {
        onError(transaction.id);
      }
    }, delay);
  });
  return promise
};

const logSuccess = (id, time) => {
  console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError = (id) => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};

makeTransaction({ id: 70, amount: 150 }).then(logSuccess).catch(logError);

makeTransaction({ id: 71, amount: 230 }).then(logSuccess).catch(logError);

makeTransaction({ id: 72, amount: 75 }).then(logSuccess).catch(logError);

makeTransaction({ id: 73, amount: 100 }).then(logSuccess).catch(logError);
