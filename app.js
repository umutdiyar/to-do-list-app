document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const addButton = document.getElementById("add-btn");
  const todoList = document.getElementById("todo-list");

  // Görevleri Local Storage'dan yükle
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => addTaskToDOM(task));
  };

  // Görevleri DOM'a ekle
  const addTaskToDOM = (task) => {
    const li = document.createElement("li");
    li.classList.add(
      "flex",
      "justify-start",
      "items-center",
      "p-2",
      "bg-gray-50",
      "dark:bg-gray-700",
      "rounded-lg",
      "shadow-sm"
    );
    li.innerHTML = `
        <input type="checkbox" class="task-checkbox mr-2" ${
          task.completed ? "checked" : ""
        }>
        <span class="${task.completed ? "line-through text-gray-400" : ""}">${
      task.text
    }</span>
      `;

    // Checkbox tıklama işlemi
    li.querySelector(".task-checkbox").addEventListener("click", (e) => {
      const isChecked = e.target.checked;
      const taskText = li.querySelector("span");

      // Görev tamamlandığında üstü çizilir
      if (isChecked) {
        taskText.classList.add("line-through", "text-gray-400");

        // 3 saniye sonra görevi sil
        setTimeout(() => {
          li.remove();
          saveTasks();
        }, 3000);
      } else {
        taskText.classList.remove("line-through", "text-gray-400");
      }

      // Görevleri güncelle
      saveTasks();
    });

    todoList.appendChild(li);
  };

  // Görevleri kaydet
  const saveTasks = () => {
    const tasks = Array.from(todoList.children).map((li) => {
      return {
        text: li.querySelector("span").innerText,
        completed: li.querySelector(".task-checkbox").checked,
      };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Görev ekle
  addButton.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (taskText) {
      const newTask = {
        text: taskText,
        completed: false,
      };
      addTaskToDOM(newTask);
      saveTasks();
      input.value = ""; // inputu temizle
    }
  });

  loadTasks();
});
