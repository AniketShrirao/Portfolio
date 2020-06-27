'use strict';

window.onload = function () {
	const page = document.querySelector('.container');

	if (page.classList.contains('home-page')) {
		// for DOM manipulation
		const hamburger = document.querySelector('.hamburger');
		const navbar = document.querySelector('.navbar');
		const ellipsis = document.querySelector('.ellipsis');
		const socialLinks = document.querySelector('.social-links');
		let navbarLinks = Array.from(document.querySelectorAll('ul.navbar li:not(:last-child) a'));
		const professionList = document.querySelector('.profession ul');
		let professionListAt = (professionList.offsetTop + professionList.offsetHeight * 0.5);
		const experienceList = document.querySelector('.experience ul');
		let experienceListAt = (experienceList.offsetTop + experienceList.offsetHeight * 0.15);
		let experienceListLi = Array.from(experienceList.querySelectorAll('li div.year-content'));

		// function for activating the social icons
		ellipsis.addEventListener('click', () => {
			ellipsis.parentElement.classList.toggle('active');
			socialLinks.classList.toggle('active');
		});

		// function for closing the social icons
		window.addEventListener('click', e => {
			if (e.target !== ellipsis) {
				ellipsis.parentElement.classList.remove('active');
				socialLinks.classList.remove('active');
			}
		});

		// function for activating the navbar
		hamburger.addEventListener('click', () => {
			hamburger.classList.toggle('active');
			navbar.classList.toggle('active');
		});

		// function for closing the navbar on click of the navbar links
		navbarLinks.forEach(element => {
			element.addEventListener('click', () => {
				if (hamburger.classList.contains('active') || navbar.classList.contains('active')) {
					hamburger.classList.remove('active');
					navbar.classList.remove('active');
				}
			});
		});

		// window on scroll functions
		window.addEventListener('scroll', () => {
			let pageAt = (window.scrollY + window.innerHeight);

			// condition for running the counter
			if (pageAt > professionListAt && !professionList.classList.contains('active')) { runCounter(professionList); }

			// condition for activating the experienceList
			if (pageAt > experienceListAt && !experienceList.classList.contains('active')) { experienceList.classList.add('active') }
			
			// condition for activating year content div
			experienceListLi.forEach(element => {
				let elementAt = (experienceList.offsetTop + element.parentElement.offsetTop + element.offsetHeight * 0.95);

				if (pageAt > elementAt && !element.classList.contains('active')) { element.classList.add('active') }
			});
		});

		// function for running the counter
		let runCounter = (div) => {

			div.classList.add('active');
			let professionListLi = Array.from(div.querySelectorAll('li div.progress-bar'));

			professionListLi.forEach(element => {

				let updateWidth = () => {

					let currentWidth = parseInt(element.firstElementChild.getAttribute('data-current'));
					let actualWidth = parseInt(element.firstElementChild.getAttribute('data-actual'));

					let increment = actualWidth / 10;

					if (actualWidth > currentWidth) {

						currentWidth += increment / 2;
						element.firstElementChild.setAttribute('data-current', currentWidth);

						element.firstElementChild.style.width = `${currentWidth}%`;
						element.lastElementChild.innerText = `${Math.floor(currentWidth)}%`;
						setTimeout(updateWidth, 50);
					}
				}
				updateWidth();
			});
		}
	}
}
