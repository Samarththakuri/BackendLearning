const fs = require("fs");
const filePath = "./task.json";
// this is a node thing
const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    // operating system wala json maan lo thats why a different format
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (error) {
    return [];
  }
};
const listTask = () => {
  const tasks = loadTasks();
  tasks.forEach((task, index) => {
    console.log(`${index + 1}-${task.task}`);
  });
};
const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ task });
  saveTask(tasks);
  console.log("TASK ADDED", task);
};
const saveTask = (tasks) => {
  const dataJson = JSON.stringify(tasks);

  fs.writeFileSync(filePath, dataJson);
};
const removeTask = (indexToRemove) => {
  const tasks = loadTasks();
  if (indexToRemove < 1 || indexToRemove > tasks.length) {
    console.log("invalid task number");
    return;
  }
  const removed = tasks.splice(indexToRemove - 1, 1);
  saveTask(tasks);
  console.log("Removed", removed[0].task);
};
const command = process.argv[2];
const argument = process.argv[3];
if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTask();
} else if (command == "remove") {
  // done to get and id plus woh string aaagya browser se that is why
  removeTask(parseInt(argument));
}
