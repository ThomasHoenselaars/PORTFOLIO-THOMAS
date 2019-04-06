const courses = document.querySelectorAll(".course");

// FILTER FUNCTION
function findMatches(filters) {
  console.log(filters);
  return [...courses].filter(course => {
    if (filters.search) {
      const regex = new RegExp(filters.search, "gi");
      const courseTitle = course.querySelector(".course-name").textContent;
      const courseDescription = course.querySelector(".course-description").textContent;

      if (!courseTitle.match(regex) && !courseDescription.match(regex)) {
        return false;
      }
    }

    if (filters.categories) {
      let check;
      filters.categories.forEach(category => {
        if (!course.classList.contains(category)) {
          check = false;
        }
      });
      if (check === false) {
        return false;
      }
    }
    return true;
  });
}
// DISPLAY FUNCTION
function displayMatches(filters) {
  const matchArray = findMatches(filters);
  courses.forEach(course => {
    course.style.display = "none";
  });
  matchArray.forEach(match => {
    match.style.display = "block";
  });
}

const filters = {
  search: "",
  categories: []
};

const searchInput = document.getElementById("search-course");

// EVENT LISTENERS
searchInput.addEventListener("keyup", event => {
  filters.search = event.target.value;
  displayMatches(filters);
});

const filterBtn = document.querySelectorAll(".filter-btn");

filterBtn.forEach(btn => {
  btn.addEventListener("click", event => {
    event.preventDefault();
    btn.classList.toggle("active");

    const index = filters.categories.indexOf(btn.dataset.filter);

    // index !== -1 ? filters.categories.splice(index, 1) : filters.categories.push(btn.dataset.filter);

    if (index !== -1) {
      filters.categories.splice(index, 1);
    } else {
      filters.categories.push(btn.dataset.filter);
    }

    displayMatches(filters);
  });
});
