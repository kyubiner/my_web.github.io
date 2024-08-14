// Fungsi untuk memuat tugas dari localStorage saat halaman dimuat
function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        addTaskToList(task.text, task.completed);
    });
}

// Fungsi untuk menyimpan tugas ke localStorage
function saveTasks() {
    var tasks = [];
    document.querySelectorAll('#taskList li').forEach(function(li) {
        var taskText = li.querySelector('span').textContent;
        var taskCompleted = li.classList.contains('completed');
        tasks.push({ text: taskText, completed: taskCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fungsi untuk menambahkan tugas ke daftar di halaman
function addTaskToList(taskText, completed = false) {
    var taskList = document.getElementById('taskList');
    var li = document.createElement('li');

    var label = document.createElement('label');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
        saveTasks();
    });

    var span = document.createElement('span');
    span.textContent = taskText;

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(li);
        saveTasks();
    });

    label.appendChild(checkbox);
    label.appendChild(span);
    li.appendChild(label);
    li.appendChild(deleteButton);
    if (completed) {
        li.classList.add('completed');
    }
    taskList.appendChild(li);
}

// Event listener untuk menambahkan tugas baru
document.getElementById('addTaskButton').addEventListener('click', function() {
    var taskInput = document.getElementById('taskInput');
    var taskText = taskInput.value.trim();

    if (taskText !== "") {
        addTaskToList(taskText);
        saveTasks();
        taskInput.value = '';
    }
});

// Muat tugas dari localStorage saat halaman dimuat
loadTasks();
