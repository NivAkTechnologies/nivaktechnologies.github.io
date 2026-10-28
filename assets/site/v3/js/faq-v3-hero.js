"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const question = document.getElementById("faq-v3-animated-question");
  const answer = document.getElementById("faq-v3-animated-answer");

  if (!question || !answer) return;

  const examples = [
    {
      q: "What does NivAk Technologies do?",
      a: "We develop applications, games and digital solutions."
    },
    {
      q: "Can you develop Flutter applications?",
      a: "Yes. We build and improve Flutter applications for Android."
    },
    {
      q: "Can you work on an existing application?",
      a: "Yes. We provide feature development, bug fixes and maintenance."
    },
    {
      q: "Do you provide Firebase integration?",
      a: "Yes. We support Firebase authentication, databases and backend integration."
    },
    {
      q: "Can you integrate AI features into an app?",
      a: "Yes. AI integration is available depending on project requirements."
    },
    {
      q: "Do you provide AdMob integration?",
      a: "Yes. We can help integrate advertising into eligible applications."
    },
    {
      q: "Can you help publish apps on Google Play?",
      a: "Yes. We provide testing, release preparation and publishing support."
    },
    {
      q: "Do you develop games?",
      a: "Yes. We develop mobile games and interactive digital experiences."
    },
    {
      q: "Can you integrate REST APIs?",
      a: "Yes. We connect applications to compatible REST APIs and backend services."
    },
    {
      q: "How can I discuss a new project?",
      a: "Contact NivAk Technologies and share your project requirements."
    }
  ];

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let index = 0;
  let timer = null;

  function stop() {
    if (timer !== null) clearTimeout(timer);
    timer = null;
  }

  function typeText(element, text, done) {
    let position = 0;
    element.textContent = "";

    function next() {
      if (position < text.length) {
        element.textContent += text[position++];
        timer = setTimeout(next, 32);
      } else {
        done();
      }
    }

    next();
  }

  function showNext() {
    const current = examples[index];

    question.textContent = "";
    answer.textContent = "";

    if (reduceMotion.matches) {
      question.textContent = current.q;
      answer.textContent = current.a;
      return;
    }

    typeText(question, current.q, function () {
      timer = setTimeout(function () {
        typeText(answer, current.a, function () {
          timer = setTimeout(function () {
            index = (index + 1) % examples.length;
            showNext();
          }, 2600);
        });
      }, 450);
    });
  }

  function restart() {
    stop();
    index = 0;
    showNext();
  }

  reduceMotion.addEventListener("change", restart);
  window.addEventListener("pagehide", stop);

  restart();
});
