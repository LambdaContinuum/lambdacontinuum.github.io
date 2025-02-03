var essaysData = [
    { title: "Divine Agency Without Failure.", url: "essays/divine-agency.html" },
    { title: "Contra Standard Deontic Logic.", url: "essays/contra-sdl.html" }
];

let openSection = null; // Variable to keep track of the currently open section

function toggleSection(section) {
    if (openSection) {
        document.getElementById(openSection).style.display = 'none';
    }

    var element = document.getElementById(section);
    if (element.style.display === 'block') {
        element.style.display = 'none';
        openSection = null;
    } else {
        element.style.display = 'block';
        openSection = section;
    }
}

function loadEssaysContent() {
	var essaysSection = document.getElementById('essays');
	var essaysContent = document.getElementById('essaysContent');

	essaysContent.innerHTML = "";

	var essaysList = document.createElement('ul');
	essaysData.forEach(function (essay) {
		var listItem = document.createElement('li');
		var link = document.createElement('a');
		link.href = essay.url;
                link.textContent = essay.title;
                listItem.appendChild(link);
		essaysList.appendChild(listItem);
	});

	essaysContent.appendChild(essaysList);
	toggleSection('essays');
}
