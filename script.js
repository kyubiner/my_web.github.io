document.getElementById('addTaskButton').addEventListener('click', function() {
    var taskInput = document.getElementById('taskInput');
    var taskText = taskInput.value.trim();

    if (taskText !== "") {
        var taskList = document.getElementById('taskList');
        var li = document.createElement('li');

        var label = document.createElement('label');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                li.classList.add('completed');
            } else {
                li.classList.remove('completed');
            }
        });

        var span = document.createElement('span');
        span.textContent = taskText;

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
        });

        label.appendChild(checkbox);
        label.appendChild(span);
        li.appendChild(label);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        taskInput.value = '';
    }
});

