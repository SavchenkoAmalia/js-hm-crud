const API_URL = "http://localhost:3000/students";

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("get-students-btn")
    .addEventListener("click", getStudents);
  document
    .getElementById("add-student-form")
    .addEventListener("submit", addStudent);
});

function getStudents() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => renderStudents(data))
    .catch((err) => console.error("Помилка отримання студентів:", err));
}

function renderStudents(students) {
  const tbody = document.querySelector("#students-table tbody");
  tbody.innerHTML = "";

  students.forEach((student) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course || ""}</td>
      <td>${student.skills || ""}</td>
      <td>${student.email || ""}</td>
      <td>${student.isEnrolled ? "Так" : "Ні"}</td>
      <td>
  <button class="update-btn" data-id="${student.id}">Оновити</button>
  <button class="delete-btn" data-id="${student.id}">Видалити</button>
</td>
    `;
    tbody.appendChild(tr);
    tr.querySelector('.update-btn').addEventListener('click', () => {
  updateStudent(student.id);
});

tr.querySelector('.delete-btn').addEventListener('click', () => {
  deleteStudent(student.id);
});
  });
}

function addStudent(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = Number(document.getElementById("age").value.trim());
  const course = document.getElementById("course").value.trim();
  const skills = document.getElementById("skills").value.trim();
  const email = document.getElementById("email").value.trim();
  const isEnrolled = document.getElementById("isEnrolled").checked;

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age, course, skills, email, isEnrolled }),
  })
    .then(() => {
      getStudents();
      e.target.reset();
    })
    .catch((err) => console.error("Помилка додавання:", err));
}

function updateStudent(id) {
  const name = prompt("Нове ім'я:");
  const age = prompt("Новий вік:");

  fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age: Number(age) }),
  })
    .then(() => getStudents())
    .catch((err) => console.error("Помилка оновлення:", err));
}

function deleteStudent(id) {
  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })
    .then(() => getStudents())
    .catch((err) => console.error("Помилка видалення:", err));
}
