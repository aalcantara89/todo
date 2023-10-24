import _ from 'lodash';
import { initializeApp } from 'firebase/app';
import { getDatabase , ref, push, get , set} from "firebase/database";


//Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg1d8JriOg3Bvl3TcQ4onFuteL3aKlJlQ",
  authDomain: "todo-list-7671e.firebaseapp.com",
  databaseURL: "https://todo-list-7671e-default-rtdb.firebaseio.com/",
  projectId: "todo-list-7671e",
  storageBucket: "todo-list-7671e.appspot.com",
  messagingSenderId: "617404539347",
  appId: "1:617404539347:web:950c1068179e550ed80f26"
};
const newApp = initializeApp(firebaseConfig);
const db = getDatabase(newApp); // Initialize the database reference


function save() {
  const projectName = document.getElementById('projectName').value;
  const task = document.getElementById('task-box').value;
  const description = document.getElementById('description-box').value;
  const dueDate = document.getElementById('dueDate-box').value;
  const priority = document.getElementById('priority').value;
  const notes = document.getElementById('notes').value;

  const dataRef = ref(db, 'projects/' + projectName.toUpperCase() + '/'+ task.toUpperCase() + " TASK");
  const newData = {
    task: task.toUpperCase(),
    description: description.toUpperCase(),
    dueDate: dueDate.toUpperCase(),
    priority: priority.toUpperCase(),
    notes: notes.toUpperCase(),
    completed: false
  };
  set(dataRef, newData)
  .then(() => {
    console.log('Data submitted');
  })
  .catch((error) => {
    console.error('Error adding data:', error);
  });

};

  

function displayProjectData(project) {
  const projectData = document.getElementById('projectData');
  
  projectData.innerHTML = '';

  // Create and append elements to display project data
  const projectNameHeading = document.createElement('h2');
  projectNameHeading.textContent = "Project Name: " + project.projectName;

  const projectTaskName = document.createElement('p');
  projectTaskName.textContent = `Task Name: ${project.task}`;

  const projectDescription = document.createElement('p');
  projectDescription.textContent = `Description: ${project.description}`;

  const projectDuedate = document.createElement('p');
  projectDuedate.textContent = `Due Date: ${project.dueDate}`;

  const projectPriority = document.createElement('p');
  projectPriority.textContent = `Priority: ${project.priority}`;

  const projectNotes = document.createElement('p');
  projectNotes.textContent = `Notes: ${project.notes}`;

  projectData.appendChild(projectNameHeading);
  projectData.appendChild(projectTaskName);
  projectData.appendChild(projectDescription);
  projectData.appendChild(projectDuedate);
  projectData.appendChild(projectPriority);
  projectData.appendChild(projectNotes);
}
function displayProjects() {
  const db = getDatabase(newApp);
  const projectRef = ref(db, 'projects');

  get(projectRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const projectsList = document.getElementById('projects-list');
        projectsList.innerHTML = ''; // Clear any existing content

        const projectData = snapshot.val();

        for (const projectName in projectData) {
          if (projectData.hasOwnProperty(projectName)) {
            const tasks = projectData[projectName];

            for (const taskName in tasks) {
              if (tasks.hasOwnProperty(taskName)) {
                const task = tasks[taskName];
                const listItem = document.createElement('li');
                const anchor = document.createElement('a');
                anchor.textContent = `${projectName}`;
                anchor.href = '#'; // You can set the actual link here
                anchor.addEventListener('click', (event) => {
                  displayProjectData(task); // Pass the task data
                });
                listItem.appendChild(anchor);
                projectsList.appendChild(listItem);
              }
            }
          }
        }
      } else {
        console.log('No project data available');
      }
    })
    .catch((error) => {
      console.error('Error retrieving project data:', error);
    });
}

// function update() {};
// function remove() {};
// const projects = [];

function displayTask(){
    if (taskCard.style.display = "none") {
        taskCard.style.display = "block";
    } else {
      taskCard.style.display = "none";
    }
  }

  const addTaskBtn = document.getElementById('addTask');
  const inputs = document.querySelectorAll('input[type=text]');
  const newProjectBtn = document.getElementById('newProjectBtn');
  const xTaskBtn = document.getElementById('close-task');
  const submitTask = document.getElementById('submitTask');
  const projectsListBtn = document.getElementById('projects-list-button');
  const projectListBtnTxt = document.getElementById('projectBtnTxt');
  const projectsList = document.getElementById('projects-list');
  projectsList.style.display = "none";

  function clearTask() {
    inputs.forEach((input) => {
      input.value = "";
    });
    taskCard.style.display = "none";
  }
  
  function clearProjectList() {
    projectsList.style.display = "none";
  }
  function toggleProjectList() {
    const initialText = "<";
    const projectsList = document.getElementById('projects-list');
    if(projectListBtnTxt.textContent.includes(initialText)) {
      projectListBtnTxt.textContent = "^";
      displayProjects();
      if(projectsList.style.display = "none") {
        projectsList.style.display = "block";
      }
    }else {
      projectListBtnTxt.textContent = initialText;
      clearProjectList();
    }
  }
//button event listeners
  addTaskBtn.addEventListener('click', () => {
    clearTask();
    displayTask();
  })  
  newProjectBtn.addEventListener('click', () => {
    clearTask();
    displayTask();
  })
  xTaskBtn.addEventListener('click', () => {
    clearTask();
    console.log('Cleared!!!');
  })
  submitTask.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default form submission
    save();
    clearTask();
  })
  projectsListBtn.addEventListener('click', () => {
    toggleProjectList();
  } )
  