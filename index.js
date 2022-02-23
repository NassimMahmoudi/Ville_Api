const express = require('express')
const app = express()
const ville = require('./data')


const persons=ville.persons
const cities=ville.cities

 //Middleware
app.use(express.json())

// obtenir la liste des personnes.
app.get('/persons', (req,res) => {
    res.status(200).json(persons)
})
// obtenir la liste des ville.
app.get('/cities', (req,res) => {
    res.status(200).json(cities)
})

// obtenir la ville dont l’id est égal à id 
app.get('/cities/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const citie = cities.find(citie => citie.id === id)
    res.status(200).json(citie)
})
// obtenir la personne dont l’id est égal à id 
app.get('/persons/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const person = persons.find(person => person.id === id)
    res.status(200).json(person)
})
//obtenir les personnes qui habitent la ville dont l’id est égal à id 
app.get("/cities/:id/persons",(req, res) => {
    let id = req.params.id;
    let listePersons = persons.filter((element) => {
        if(element.cities){
            for (let city of element.cities){
                if(city.id == id){
                    return true;
                }
            }
        }else{
            return false;
        }
        
        
    });

    res.status(200).json(listePersons);
});
// La liste des personnes triées selon un champ sort (city ou name)
app.get("/persons",(req, res) => {
    let sort = req.query.sort;
    let name = req.query.name;
    let cityId = req.query.city;
    let listePersons=persons;
    if(name){
        listePersons = listePersons.filter((el) => el.name == name)
    }
    if(city){
        listePersons = listePersons.filter((el) => {
            for(let city of el.cities){
                if(city.id == cityId)
                return true;
            }
            return false;
        });
    }
    if(sort=="name"){
        listePersons = listePersons.sort();
    }
    res.status(200).json(listePersons);
});
// Ajouter une personne
app.post('/person', (req,res) => {
    req.body.id=persons.length+1;
    persons.push(req.body)
    res.status(200).json(persons)
})
// Ajouter une ville
app.post('/city', (req,res) => {
    req.body.id=cities.length+1;
    cities.push(req.body) 
    res.status(200).json(cities)
})

// Modifier une personne
app.put('/persons/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let person = persons.find(person => person.id === id)
    if(person.name==req.body.name){
        res.status(401).send("You should change name at least")
    }else{
        person.name =req.body.name,
        person.city =req.body.city,
        person.type =req.body.type;     
        res.status(200).json(persons)
    }
    
})

// Modifier une ville
app.put('/cities/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let city = cities.find(city => city.id === id)
    if(city.name==req.body.name){
        res.status(401).send("You should change name at least")
    }else{
        city.name =req.body.name,
        city.area =req.body.city,
        city.population =req.body.type;
        res.status(200).json(cities)
    }
    
})

// Supprimer une personne
app.delete('/person/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let person = persons.find(person => person.id === id)
    persons.splice(persons.indexOf(person),1)
    res.status(200).json(persons)
})
// Supprimer une ville
app.delete('/city/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let city = cities.find(city => city.id === id)
    cities.splice(cities.indexOf(city),1)
    res.status(200).json(cities)
})


app.listen(8080, () => {
    console.log('Serveur à l\'écoute')
})