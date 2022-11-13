import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import sortBy from 'sort-by';
import Select from 'react-select';

// Fetching data from the JSON file
import fsPromises from 'fs/promises';
import path from 'path';
import {useState} from "react";
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'animalsData.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
	props: objectData
  }
}

export function dropdownFilter(arrayData, dataSelected, handleChange, isMulti)
{
    return (
        <Select
            name={dataSelected}
            options={arrayData}
            isMulti={isMulti}
            placeholder={<div>Select {dataSelected}...</div>}
            isClearable="true"
            className="basic-select"
            classNamePrefix="select"
            onChange={event => handleChange(dataSelected, event)}
        />
    )
}

export default function Animals(props) {
  const [query, setQuery] = useState({
      search: '',
      type: '',
      habitat: [],
      diet: '',
      location: [],
      tame: ''
  });

  const searchFilter = (animalsList) => {
	  return animalsList.filter(
		  (animal) => animal.id.includes(query.search)
	  )
  }

    const getArrayFilterByType = (animalsList) => {
        let resultFilter = [];
        let uniqueElements = [];
        for (let i = 0; i < Object.keys(animalsList).length; i++) {
            if (!uniqueElements.includes(animalsList[i].type)) {
                uniqueElements.push(animalsList[i].type);
                resultFilter.push({value: animalsList[i].type, label: animalsList[i].type});
            }
        }
        return resultFilter;
    }
    const typeFilter = (animalsList) => {
        return animalsList.filter(
            (animal) => animal.type.includes(query.type)
        )
    }

    const getArrayFilterByHabitat = () => {
        return [{value: "Air", label: "Air"}, {value: "Land", label: "Land"}, {value: "Sea", label: "Sea"}];
    }
    const habitatFilter = (animalsList) => {
        return animalsList.filter(
            (animal) => query.habitat.every(
                elem => animal.habitat.includes(elem)
            )
        )
    }

    const getArrayFilterByDiet = (animalsList) => {
        let resultFilter = [];
        let uniqueElements = [];
        for (let i = 0; i < Object.keys(animalsList).length; i++) {
            if (!uniqueElements.includes(animalsList[i].diet)) {
                uniqueElements.push(animalsList[i].diet);
                resultFilter.push({value: animalsList[i].diet, label: animalsList[i].diet});
            }
        }
        return resultFilter;
    }
    const dietFilter = (animalsList) => {
        return animalsList.filter(
            (animal) => animal.diet.includes(query.diet)
        )
    }

    const getArrayFilterByLocation = () => {
      return [
          {value: "Africa", label: "Africa"},
          {value: "Antarctica", label: "Antarctica"},
          {value: "Asia", label: "Asia"},
          {value: "Australia", label: "Australia"},
          {value: "Europe", label: "Europe"},
          {value: "North America", label: "North America"},
          {value: "South America", label: "South America"}
      ];
    }
    const locationFilter = (animalsList) => {
        return animalsList.filter(
            (animal) => query.location.every(
                elem => animal.locations.includes(elem)
            )
        )
    }

    const getArrayFilterByTame = (animalsList) => {
        let resultFilter = [];
        let uniqueElements = [];
        for (let i = 0; i < Object.keys(animalsList).length; i++) {
            if (!uniqueElements.includes(animalsList[i].tamed)) {
                uniqueElements.push(animalsList[i].tamed);
                resultFilter.push({value: animalsList[i].tamed, label: animalsList[i].tamed});
            }
        }
        return resultFilter;
    }
    const tameFilter = (animalsList) => {
        return animalsList.filter(
            (animal) => animal.tamed.includes(query.tame)
        )
    }

  let animals = props.animals;
  animals.sort(sortBy('name','id'));
  let animalsDup = [...animals];
  animals = searchFilter(animals);
  animals = typeFilter(animals);
  animals = habitatFilter(animals);
  animals = dietFilter(animals);
  animals = locationFilter(animals);
  animals = tameFilter(animals);


    const handleChange = (selector, event) => {
        if (selector === "search") {
            handleChangeSearch(event);
        } else if (selector === "type") {
            handleChangeType(event);
        } else if (selector === "habitat") {
            handleChangeHabitat(event);
        } else if (selector === "diet") {
            handleChangeDiet(event);
        } else if (selector === "location") {
            handleChangeLocation(event);
        } else if (selector === "tame") {
            handleChangeTame(event);
        }
    }


    const handleChangeSearch = (e) => {
        setQuery({...query, search: e.target.value})
    }
    const handleChangeType = (e) => {
        //console.log(e)
        if(e !== null) {
            setQuery({...query, type: e.value})
        }
        else
        {
            setQuery({...query, type: ''})
        }
    }
    const handleChangeHabitat = (e) => {
        //console.log(e)
        if(e.length !== 0) {
            let arrayHabitats = [];
            for (let i = 0; i < e.length; i++) {
                arrayHabitats.push(e[i].value);
            }
            setQuery({...query, habitat: arrayHabitats});
        }
        else
        {
            setQuery({...query, habitat: []})
        }
    }
    const handleChangeDiet = (e) => {
        //console.log(e)
        if(e !== null) {
            setQuery({...query, diet: e.value})
        }
        else
        {
            setQuery({...query, diet: ''})
        }
    }
    const handleChangeLocation = (e) => {
        //console.log(e)
        if(e.length !== 0) {
            let arrayLocations = [];
            for (let i = 0; i < e.length; i++) {
                arrayLocations.push(e[i].value);
            }
            setQuery({...query, location: arrayLocations});
        }
        else
        {
            setQuery({...query, location: []})
        }
    }
    const handleChangeTame = (e) => {
        //console.log(e)
        if(e !== null) {
            setQuery({...query, tame: e.value})
        }
        else
        {
            setQuery({...query, tame: ''})
        }
    }

  return (
	<div className={styles.container}>
	  <Head>
		<title>Animal World | List</title>
		<meta name="description" content="A list of animals to search for and filter." />
		<link rel="icon" href="/favicon.ico" />
	  </Head>

	  <main>

		<div className="pb-20 pt-4">
            <div className={`${"rounded-2 pt-3 pb-6"} ${styles["filterArea"]}`}>
                <h1 className="justify-content-around pl-2"><i className={`${"bi bi-filter"} ${styles["i"]}`}></i>Filter:</h1>
                <div className="row justify-content-around">
                    <div className={`${"col-sm-6 pt-2 pb-2 pl-2 pr-2"} ${styles["filterSize"]}`}>
                        <input onChange={event => handleChange("search", event)} type='search' className="form-control rounded-1" placeholder='Search animal...'/>
                    </div>
                    <div className={`${"col-sm-6 pt-2 pb-2 pl-2 pr-2"} ${styles["filterSize"]}`}>
                        { dropdownFilter(getArrayFilterByType(animalsDup), "type", handleChange, false) }
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className={`${"col-sm-6 pt-2 pb-2 pl-2 pr-2"} ${styles["filterSize"]}`}>
                        { dropdownFilter(getArrayFilterByHabitat(), "habitat", handleChange, true) }
                    </div>
                    <div className={`${"col-sm-6 pt-2 pb-2 pl-2 pr-2"} ${styles["filterSize"]}`}>
                        { dropdownFilter(getArrayFilterByDiet(animalsDup), "diet", handleChange, false) }
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className={`${"col-sm-6 pt-2 pb-2 pl-2 pr-2"} ${styles["filterSize"]}`}>
                        { dropdownFilter(getArrayFilterByLocation(), "location", handleChange, true) }
                    </div>
                    <div className={`${"col-sm-6 pt-2 pb-2 pl-2 pr-2"} ${styles["filterSize"]}`}>
                        { dropdownFilter(getArrayFilterByTame(animalsDup), "tame", handleChange, false) }
                    </div>
                </div>
            </div>
		</div>

		<div className="row">
		  {animals.map(animal =>
			  <div key={animal.id} className="col-sm-2 pt-2 pb-2 pl-2 pr-2">
				<Link href={"/animals/" + animal.id}>
					<div className={`${"card text-center"} ${styles["animalCard"]}`}>
						<Image className="card-img-top object-position-default" id={"object-position-" + animal.id} src={((animal.first_image)[0]).imagelink} alt={((animal.first_image)[0]).alt} width={240} height={240}/>
						<div className="card-body">
							<h2 className="card-title">{animal.name}</h2>
						</div>
					</div>
				</Link>
			  </div>
		  )}
		</div>
	  </main>


	</div>
  )
}
