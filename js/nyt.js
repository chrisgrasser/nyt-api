/* script.js */

function displaySection(section) {
    // url to fetch the sections with
    const url = 'http://api.nytimes.com/svc/topstories/v2/' + section + '.json?api-key=' + API_KEY

    fetch(url)
        .then(res => res.json())
        .then(data => {
            // declare all variables needed for each individual card
            let cards
            let img
            let body
            let title
            let titleLink
            let section
            let byline
            let nytDate
            let formattedDate
            let date
            let abstract

            data.results.forEach(item => {
                // format the date
                nytDate = item.published_date
                formattedDate = new Date(nytDate.substring(0, 10))
                formattedDate = formattedDate.toLocaleDateString('en-us', { month: "long", day: "2-digit", weekday: "long", year: "numeric" })

                // create outer card div
                cards = document.createElement('div')
                cards.classList.add('card')
                content.append(cards)

                // create section header
                section = document.createElement('p')
                section.classList.add('section', 'fw-bold', 'capitalize')
                // readablility adjustments
                if (item.section == 'us') {
                    section.innerText = 'US'
                } else if (item.section == 'nyregion') {
                    section.innerText = 'New York'
                } else if (item.section == 'realestate') {
                    section.innerText = 'Real Estate'
                } else if (item.section == 'sundayreview') {
                    section.innerText = 'Sunday Review'
                } else if (item.section == 'homepage') {
                    section.innerText = 'Home Page'
                } else {
                    section.innerText = item.section
                }
                cards.append(section)

                // create card image
                img = document.createElement('img')
                if (item.multimedia != null) {
                    img.setAttribute('src', item.multimedia[0].url)
                    img.setAttribute('alt', item.multimedia[0].caption)
                } else {
                    img.setAttribute('src', 'https://cdn.pixabay.com/photo/2017/03/21/02/00/image-2160911_960_720.png')
                    img.setAttribute('alt', 'image placeholder')
                }

                // img.classList.add('card-img-top')
                cards.append(img)

                // create card-body div
                body = document.createElement('div')
                body.classList.add('card-body')
                cards.appendChild(body)

                // create h5 heading for title
                title = document.createElement('h5')
                body.append(title)

                // create a element around the title
                titleLink = document.createElement('a')
                titleLink.setAttribute('href', item.url)
                titleLink.setAttribute('title', item.title)
                titleLink.innerText = item.title
                title.appendChild(titleLink)

                // create the publish date p element
                date = document.createElement('p')
                date.classList.add('text-muted')
                date.innerText = formattedDate
                body.append(date)

                // create the byline p element
                byline = document.createElement('p')
                byline.classList.add('text-muted')
                byline.innerText = item.byline
                body.append(byline)

                // create the abstract p element
                abstract = document.createElement('p')
                abstract.classList.add('card-text')
                abstract.innerText = item.abstract
                body.append(abstract)
            })
        })
}

// declare variables
const API_KEY = 'YOUR_API_KEY_HERE'
const subject = document.querySelector('#subject')
const subjectList = ['home', 'arts', 'automobiles', 'books', 'business', 'fashion', 'food', 'health', 'insider', 'magazine', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'theater', 't-magazine', 'travel', 'upshot', 'us', 'world']
const refresh = document.querySelector('#refresh')
const content = document.querySelector('#content')

// dropdown menu assembly
let output = ''
// readability adjustments
subjectList.forEach(item => {
    if (item == 'nyregion') {
        output += `<option value=${item}>New York</option>`
    } else if (item == 'us') {
        output += `<option value=${item}>US</option>`
    } else if (item == 'realestate') {
        output += `<option value=${item}>Real Estate</option>`
    } else if (item == 'sundayreview') {
        output += `<option value=${item}>Sunday Review</option>`
    } else {
        output += `<option value=${item}>${item}</option>`
    }
})
// display options
subject.innerHTML = output

// dropdown menu changing
subject.addEventListener('change', function () {
    content.innerHTML = ''
    displaySection(subject.value)
})

// refresh button
refresh.addEventListener('click', function () {
    content.innerHTML = ''
    // redeploy the displaySection function using current selected value
    displaySection(subject.value)
})

// home page
displaySection('home')