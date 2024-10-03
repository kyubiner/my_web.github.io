function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function (task) {
        addTaskToList(task.text, task.day, task.subject, task.completed);
    });
}

function saveTasks() {
    var tasks = [];
    document.querySelectorAll('#taskList li').forEach(function (li) {
        var taskText = li.querySelector('.taskText').textContent;
        var taskDay = li.querySelector('.taskDay').textContent;
        var taskSubject = li.querySelector('.taskSubject').textContent;
        var taskCompleted = li.classList.contains('completed');
        tasks.push({ text: taskText, day: taskDay, subject: taskSubject, completed: taskCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTaskToList(taskText, taskDay, taskSubject, completed = false) {
    var taskList = document.getElementById('taskList');
    var li = document.createElement('li');

    var label = document.createElement('label');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
        saveTasks();
    });

    var spanText = document.createElement('span');
    spanText.textContent = taskText;
    spanText.className = 'taskText';

    var spanDay = document.createElement('span');
    spanDay.textContent = taskDay;
    spanDay.className = 'taskDay';

    var spanSubject = document.createElement('span');
    spanSubject.textContent = taskSubject;
    spanSubject.className = 'taskSubject';

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.disabled = !checkbox.checked; // Tombol dinonaktifkan jika belum diceklis

    deleteButton.addEventListener('click', function () {
        if (checkbox.checked) {
            taskList.removeChild(li);
            saveTasks();
        }
    });

    checkbox.addEventListener('change', function () {
        deleteButton.disabled = !checkbox.checked;
    });

    label.appendChild(checkbox);
    label.appendChild(spanText);
    label.appendChild(document.createTextNode(' - '));
    label.appendChild(spanDay);
    label.appendChild(document.createTextNode(' - '));
    label.appendChild(spanSubject);

    li.appendChild(label);
    li.appendChild(deleteButton);
    if (completed) {
        li.classList.add('completed');
    }
    taskList.appendChild(li);
}

document.getElementById('addTaskButton').addEventListener('click', function () {
    var taskInput = document.getElementById('taskInput');
    var dayInput = document.getElementById('dayInput');
    var subjectInput = document.getElementById('subjectInput');

    var taskText = taskInput.value.trim();
    var taskDay = dayInput.value;
    var taskSubject = subjectInput.value.trim();

    if (taskText !== "" && taskSubject !== "") {
        addTaskToList(taskText, taskDay, taskSubject);
        saveTasks();
        taskInput.value = '';
        subjectInput.value = '';
    }
});

loadTasks();

