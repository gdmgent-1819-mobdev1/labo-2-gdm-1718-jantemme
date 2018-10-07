let storageCounter = 0;
let personsCounter = 0;
let persons = [];
let likes = [];
let dislikes = [];
let samePerson = false;

function NewPerson(person, storageCounter) {
    let thisPerson = {};
    thisPerson.firstName = person.results[storageCounter].name.first;
    thisPerson.lastName = person.results[storageCounter].name.last;
    thisPerson.age = person.results[storageCounter].dob.age;
    thisPerson.area = person.results[storageCounter].location.city;
    thisPerson.profilePic = person.results[storageCounter].picture.large;
    thisPerson.userID = person.results[storageCounter].login.uuid;
    
    return thisPerson;
}

    function loadNew(){
        fetch("https://randomuser.me/api/?results=10")
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                localStorage.setItem("people", JSON.stringify(myJson));
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ', error.message);
            });

            people = JSON.parse(localStorage.getItem("people"));
            storageCounter = 0;
            console.log("10 new people arrived!");
    }

    function showProfile(){
        persons.forEach(person => {
            if(person.userID == people.results[storageCounter].login.uuid)
                samePerson = true;
            else
                samePerson = false;
        });

        if(!samePerson)
        {
            document.getElementById('infoholder').innerHTML = "<h2>"+ people.results[storageCounter].name.first + " " + people.results[storageCounter].name.last + ", " + people.results[storageCounter].dob.age + "</h2> </br> <h2>" + people.results[storageCounter].location.city + "</h2>";
            document.getElementById('imageholder').innerHTML = "<img src='" + people.results[storageCounter].picture.large + "' alt='profilepicture'>";
            persons.push(new NewPerson(people, storageCounter));
        }
        console.log(samePerson);
    }

    function dislike(){
        ++storageCounter;
        if(storageCounter < 9)
        {
            showProfile();
            dislikes.push(persons[personsCounter]);
            personsCounter++;
        }
        else
        {
            showProfile();
            dislikes.push(persons[personsCounter]);
            personsCounter++;
            loadNew();
        }
    }
    
    function like(){
        ++storageCounter;
        if(storageCounter < 9)
        {
            showProfile();
            likes.push(persons[personsCounter]);
            personsCounter++;
        }
        else
        {
            showProfile();
            likes.push(persons[personsCounter]);
            personsCounter++;
            loadNew();
        }
    }

    function dislikeToLike(e){
        let name = e.currentTarget.innerHTML;
        let counter = 0;

        firstAndLastName = name.split(" ");
        dislikes.forEach(person => {
            if(person.firstName == firstAndLastName[0] && person.lastName == firstAndLastName[1])
            {
                likes.push(person);
                dislikes.splice(counter, 1);
                showDislikes();
            }
            counter++;
        });
    }

    function likeToDislike(e){
        let name = e.currentTarget.innerHTML;
        let counter = 0;

        firstAndLastName = name.split(" ");
        likes.forEach(person => {
            if(person.firstName == firstAndLastName[0] && person.lastName == firstAndLastName[1])
            {
                dislikes.push(person);
                likes.splice(counter, 1);
                showLikes();
            }
            counter++;
        });
    }

    function showDislikes(){
        document.getElementById('pastPeople').innerHTML = "<span id='close' class='close'>&times;</span><h3>Dislikes</h3><h3>click name to like</h3>";
        dislikes.forEach(person => {
            document.getElementById('pastPeople').innerHTML += "<h4>" + person.firstName + " " + person.lastName + "</h4>";
        });
        document.getElementById('modal').style.display = "block";
        let names = document.getElementsByTagName('h4');
        for(let x = 0; x < names.length; x++)
        {
            names[x].addEventListener("click", dislikeToLike);
        }

        document.getElementById('close').addEventListener('click', function(){
            modal.style.display = "none";
        })

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    function showLikes(){
        document.getElementById('pastPeople').innerHTML = "<span id='close' class='close'>&times;</span><h3>Likes</h3><h3>click name to dislike</h3>";
        likes.forEach(person => {
            document.getElementById('pastPeople').innerHTML += "<h4>" + person.firstName + " " + person.lastName + "</h4>";
        });
        document.getElementById('modal').style.display = "block";
        let names = document.getElementsByTagName('h4');
        for(let x = 0; x < names.length; x++)
        {
            names[x].addEventListener("click", likeToDislike);
        }

        document.getElementById('close').addEventListener('click', function(){
            modal.style.display = "none";
        })

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    loadNew();
    showProfile();

    document.getElementById('button--dislike').addEventListener("click", dislike);
    document.getElementById('button--like').addEventListener("click", like);
    document.getElementById('button--dislikes').addEventListener("click", showDislikes);
    document.getElementById('button--likes').addEventListener("click", showLikes);
