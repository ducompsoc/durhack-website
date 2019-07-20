// import styles for webpack
import "../sass/style.scss";

// initiate particles
particlesJS.load('particles-js', "/particles_parameters.json", function () {
    console.log('callback - particles.js config loaded');
});

// sort out FAQ autocomplete.
var my_autoComplete = new autoComplete({
    selector: '#faqInput',
    minChars: 0,
    source: function (term, suggest) {
        term = term.toLowerCase();
        var choices = Object.keys(window.faqJSONs);
        var matches = [];
        for (let i = 0; i < choices.length; i++)
            if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
        suggest(matches);
    },

    onSelect: function (e, term, item) {
        // trigger response.
        var key = item.getAttribute('data-val');
        document.getElementById('faqResponse').innerHTML = window.faqJSONs[key];
        document.getElementById('faqResponse').style.display = "block";
    }
});


// var teamJSONs;
fetch("/team")
    .then(response => response.json())
    .then(json => processTeam(json));

function processTeam(teamJSONs) {
    var box = document.getElementById('teambox')
    // load Team data.
    for (var i = 0; i < teamJSONs.length; i++) {
        var human = teamJSONs[i]
        var ent = document.createElement('div');
        var lineStr = human.name + "\n" + human.role + "\n" + human.email
        ent.setAttribute('data-tooltip', lineStr)
        ent.setAttribute('class', 'team_member tooltip')
        var link = document.createElement('a');
        link.setAttribute('href', 'mailto:' + human.email)
        var mug = document.createElement('img');
        mug.setAttribute('src', human.mugshot)
        mug.setAttribute('class', "mugshot")
        link.appendChild(mug)
        ent.appendChild(link)
        box.appendChild(ent);
    }
}

// process sponsors
fetch('/sponsors')
    .then(response => response.json())
    .then(json => processSponsors(json));

function processSponsors(resp) {
    console.log('processing sponsors', resp);
    // process partners differently.
    const sponsorContainer = document.getElementById('sponsor-base');
    // partnerContainer = document.getElementById('sponsor-partners')
    // var partners = resp.partners;
    var sponsors = resp.sponsors;

    console.log(Object.keys(sponsors))
    for (var i = 0; i < Object.keys(sponsors).length; i++) {
        var categoryName = Object.keys(sponsors)[i]
        var category = sponsors[categoryName];

        var baseEnt = document.createElement('div');
        baseEnt.setAttribute("class", "sponsor_class " + categoryName)

        var labelContainer = document.createElement('div')
        labelContainer.setAttribute('class', "label_container")
        var label = document.createElement('span')
        label.setAttribute('class', "category_label")
        label.innerHTML = categoryName
        labelContainer.appendChild(label);
        baseEnt.appendChild(labelContainer);

        for (var j = 0; j < category.length; j++) {
            var sponsor = category[j];
            console.log(sponsor);
            var ent = document.createElement('a');
            ent.setAttribute('class', 'sponsor_class_box ' + categoryName);
            ent.setAttribute('href', sponsor.url);
            var img = document.createElement('img');
            img.setAttribute('src', sponsor.image);
            img.setAttribute('alt', sponsor.name);
            ent.appendChild(img)
            baseEnt.appendChild(ent)
        }
        sponsorContainer.appendChild(baseEnt)
    }
}

window.setupFAQs = ((faqs) => {
    const faqContainer = document.querySelector('.container .faqs');
    for (let [question, answer] of Object.entries(faqs)) {
        faqContainer.innerHTML += `
            <div class="faq_contents_box highlight_box">
                <h3 class="faq_title">${question}</h3>
                <p>${answer}</p>
            </div>
        `;
    }
});

