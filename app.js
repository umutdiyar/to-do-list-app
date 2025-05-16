document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = themeToggleBtn.querySelector("i");
  const taskBox = document.getElementById("task-box");

  // 🌗 Tema değiştirme
  themeToggleBtn.addEventListener("click", () => {
    const isDarkMode = document.body.classList.contains("bg-gray-800");

    document.body.classList.toggle("bg-gray-800", !isDarkMode);
    document.body.classList.toggle("text-gray-200", !isDarkMode);
    document.body.classList.toggle("bg-gray-100", isDarkMode);
    document.body.classList.toggle("text-gray-900", isDarkMode);
    themeIcon.classList.replace(
      isDarkMode ? "fa-sun" : "fa-moon",
      isDarkMode ? "fa-moon" : "fa-sun"
    );

    themeToggleBtn.classList.toggle("text-gray-200", !isDarkMode);
    themeToggleBtn.classList.toggle("hover:text-gray-800", isDarkMode);
    themeToggleBtn.classList.toggle("hover:bg-gray-800", !isDarkMode);
    themeToggleBtn.classList.toggle("hover:bg-gray-300", isDarkMode);

    taskBox.classList.toggle("bg-gray-400");
    taskBox.classList.toggle("bg-gray-800");
    taskBox.classList.toggle("text-gray-800");
    taskBox.classList.toggle("text-gray-200");
    taskBox.classList.toggle("shadow-lg");

    input.classList.toggle("bg-gray-100");
    input.classList.toggle("bg-gray-600");
    input.classList.toggle("border-gray-200");
    input.classList.toggle("border-gray-800");

    updateTaskTheme();
  });

  // 📥 LocalStorage'dan görevleri yükle
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => addTaskToDOM(task));
  };

  // ✅ Görevleri DOM'a ekle
  const addTaskToDOM = (task) => {
    const li = document.createElement("li");
    const isDarkMode = document.body.classList.contains("bg-gray-800");

    li.classList.add(
      "flex",
      "justify-start",
      "items-center",
      "p-2",
      "rounded-lg",
      "shadow-sm",
      "overflow-visible",
      "break-words",
      isDarkMode ? "bg-gray-700" : "bg-gray-50"
    );

    li.innerHTML = `
      <input type="checkbox" class="task-checkbox mr-2" ${
        task.completed ? "checked" : ""
      }>
      <span class="flex-1 break-words ${
        task.completed
          ? "line-through text-gray-400"
          : isDarkMode
          ? "text-white"
          : "text-black"
      }">
        ${task.text}
      </span>
    `;

    li.querySelector(".task-checkbox").addEventListener("click", (e) => {
      const isChecked = e.target.checked;
      const taskText = li.querySelector("span");

      if (isChecked) {
        taskText.classList.add("line-through", "text-gray-400");
        taskText.classList.remove("text-white", "text-black");

        setTimeout(() => {
          li.remove();
          saveTasks();
        }, 2000);
      } else {
        taskText.classList.remove("line-through", "text-gray-400");
        taskText.classList.add(isDarkMode ? "text-white" : "text-black");
      }

      saveTasks();
    });

    todoList.appendChild(li);
  };

  // 🎨 Tema geçişinde görevleri güncelle
  const updateTaskTheme = () => {
    const isDarkMode = document.body.classList.contains("bg-gray-800");
    document.querySelectorAll("li").forEach((li) => {
      li.classList.toggle("bg-gray-700", isDarkMode);
      li.classList.toggle("bg-gray-50", !isDarkMode);

      const taskText = li.querySelector("span");
      if (!taskText.classList.contains("line-through")) {
        taskText.classList.toggle("text-white", isDarkMode);
        taskText.classList.toggle("text-black", !isDarkMode);
      }
    });
  };

  // 💾 Görevleri kaydet
  const saveTasks = () => {
    const tasks = Array.from(todoList.children).map((li) => {
      return {
        text: li.querySelector("span").innerText,
        completed: li.querySelector(".task-checkbox").checked,
      };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // ⌨️ Enter tuşu ile görev ekle
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const taskText = input.value.trim();
      if (taskText) {
        const newTask = {
          text: taskText,
          completed: false,
        };
        addTaskToDOM(newTask);
        saveTasks();
        input.value = "";
      }
    }
  });

  const updateDate = () => {
    const dateElement = document.getElementById("date");
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = now.toLocaleDateString("tr-TR", options);
    dateElement.textContent = formattedDate;
  };

  updateDate();
  loadTasks();
});
