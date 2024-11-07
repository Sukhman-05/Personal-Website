// -------------------- To-Do App --------------------

// Function to add a task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create a new list item
    const li = document.createElement('li');
    
    // Create a text node for the task and append it to the list item
    const textNode = document.createTextNode(taskText);
    li.appendChild(textNode);

    // Create a delete button and append it to the list item
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.onclick = function() {
        li.remove();  // Remove the task from the list
    };
    li.appendChild(deleteButton);

    // Add a click event to mark the task as completed
    li.onclick = function() {
        li.classList.toggle('completed');
    };

    // Add the list item to the task list
    document.getElementById('taskList').appendChild(li);

    // Clear the input field
    taskInput.value = '';
}


// -------------------- Fitness Tracker --------------------

// Function to add a workout
function addWorkout() {
    const workoutName = document.getElementById('workoutName').value.trim();
    const workoutDuration = document.getElementById('workoutDuration').value.trim();
    const workoutCalories = document.getElementById('workoutCalories').value.trim();

    if (workoutName === "" || workoutDuration === "" || workoutCalories === "") {
        alert("Please fill in all fields!");
        return;
    }

    const newWorkout = {
        name: workoutName,
        duration: workoutDuration,
        calories: workoutCalories,
    };

    const li = document.createElement('li');
    li.textContent = `${newWorkout.name} - ${newWorkout.duration} mins - ${newWorkout.calories} calories`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.onclick = function() {
        deleteWorkout(newWorkout);
        li.remove();
    };
    li.appendChild(deleteButton);

    document.getElementById('workoutList').appendChild(li);

    saveWorkouts();
    document.getElementById('workoutName').value = '';
    document.getElementById('workoutDuration').value = '';
    document.getElementById('workoutCalories').value = '';
}

// Function to save workouts to localStorage
function saveWorkouts() {
    const workouts = [];
    const workoutListItems = document.querySelectorAll('#workoutList li');

    workoutListItems.forEach(item => {
        workouts.push(item.textContent.replace('Delete', '').trim());
    });

    localStorage.setItem('workouts', JSON.stringify(workouts));
}

// Function to load workouts from localStorage
function loadWorkouts() {
    const storedWorkouts = JSON.parse(localStorage.getItem('workouts'));
    if (storedWorkouts) {
        storedWorkouts.forEach(workout => {
            const li = document.createElement('li');
            li.textContent = workout;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete');
            deleteButton.onclick = function() {
                deleteWorkout(workout);
                li.remove();
            };
            li.appendChild(deleteButton);
            document.getElementById('workoutList').appendChild(li);
        });
    }
}

// Function to delete workout from localStorage
function deleteWorkout(workoutToDelete) {
    const storedWorkouts = JSON.parse(localStorage.getItem('workouts'));
    const updatedWorkouts = storedWorkouts.filter(workout => workout !== workoutToDelete);
    localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
}

// -------------------- Load Data on Page Load --------------------
window.onload = function() {
    loadTasks();
    loadWorkouts();
};

