async function addTask() {
  let input = document.getElementById("taskInput").value;

  await fetch("/tasks", {
    method: "POST",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({ title: input }),
  });

  document.getElementById("taskInput").value = "";

  loadTasks();
}

async function loadTasks() {
  let res = await fetch("/tasks");

  let tasks = await res.json();

  let list = document.getElementById("taskList");

  list.innerHTML = "";

  tasks.forEach((t) => {
    let li = document.createElement("li");

    li.innerText = t.title + " ";

    if (t.completed) {
      li.style.textDecoration = "line-through";
    }

    let doneBtn = document.createElement("button");

    doneBtn.innerText = "Done";

    doneBtn.onclick = async () => {
      await fetch(`/tasks/${t._id}`, {
        method: "PUT",
      });

      loadTasks();
    };

    let delBtn = document.createElement("button");

    delBtn.innerText = "Delete";

    delBtn.onclick = async () => {
      await fetch(`/tasks/${t._id}`, {
        method: "DELETE",
      });

      loadTasks();
    };

    li.appendChild(doneBtn);

    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

loadTasks();
