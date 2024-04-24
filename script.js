function addCourse() {
    const container = document.getElementById('coursesContainer');
    const newCourse = container.firstElementChild.cloneNode(true);
    newCourse.querySelector('.grade').selectedIndex = 0; // Reset grade selection to the first option
    newCourse.querySelector('.credits').value = ''; // Clear the credits input
    container.appendChild(newCourse);
    updateCourseLabels();
}

function removeCourse(button) {
    const container = document.getElementById('coursesContainer');
    if (container.childElementCount > 1) {
        container.removeChild(button.parentNode);
        updateCourseLabels();
    } else {
        alert("You must have at least one course.");
    }
}

function updateCourseLabels() {
    const courses = document.querySelectorAll('#coursesContainer .course');
    courses.forEach((course, index) => {
        const label = course.querySelector('.courseLabel');
        label.textContent = `Course ${index + 1}:`;
    });
}

function processInputs(form) {
    const earnedCredit = parseFloat(document.getElementById('earnedCredit').value);
    const currentCGPA = parseFloat(document.getElementById('currentCGPA').value);

    const courses = Array.from(form.querySelectorAll('.course'));
    const inputs = courses.map(course => {
        const credit = parseInt(course.querySelector('.credits').value);
        const grade = course.querySelector('.grade').value.toUpperCase();
        return [credit, grade];
    });

    const currentSemCredits = inputs.reduce((acc, [credit]) => acc + credit, 0);
    const currentGPA = calculateGPA(inputs);
    const finalCGPA = calculateCGPA(earnedCredit, currentCGPA, currentSemCredits, currentGPA);

    document.getElementById('semGPA').textContent = `Your semester GPA is: ${currentGPA}`;
    document.getElementById('result').textContent = `Your CGPA is: ${finalCGPA}`;
}


function calculateCGPA(earnedCredit, currentCGPA, currentSemCredits, gpa) {
    const cgpa = (earnedCredit * currentCGPA + currentSemCredits * gpa) / (earnedCredit + currentSemCredits);
    return cgpa.toFixed(2);
}

function calculateGPA(inputs) {
    const gpaScale = {
        "A": 4.0, "A-": 3.7, "B+": 3.4, "B": 3.0, "B-": 2.7,
        "C+": 2.4, "C": 2.0, "C-": 1.7, "D+": 1.4, "D": 1.0,
        "D-": 0.7, "F": 0.0, "WF": 0.0
    };

    let totalPoints = 0;
    let totalCredits = 0;

    inputs.forEach(([credit, grade]) => {
        if (gpaScale.hasOwnProperty(grade)) {
            totalPoints += gpaScale[grade] * credit;
            totalCredits += credit;
        }
    });

    const gpa = totalPoints / totalCredits;
    return gpa.toFixed(2);
}

function processInputs(form) {
    const earnedCredit = parseFloat(document.getElementById('earnedCredit').value);
    const currentCGPA = parseFloat(document.getElementById('currentCGPA').value);

    const courses = Array.from(form.querySelectorAll('.course'));
    const inputs = courses.map(course => {
        const credit = parseInt(course.querySelector('.credits').value);
        const grade = course.querySelector('.grade').value.toUpperCase();
        return [credit, grade];
    });

    const currentSemCredits = inputs.reduce((acc, [credit]) => acc + credit, 0);
    const currentGPA = calculateGPA(inputs);
    const finalCGPA = calculateCGPA(earnedCredit, currentCGPA, currentSemCredits, currentGPA);

    document.getElementById('result').textContent = `Your CGPA is: ${finalCGPA}`;
    document.getElementById('semGPA').textContent = `Your semester GPA is: ${currentGPA}`;
}
