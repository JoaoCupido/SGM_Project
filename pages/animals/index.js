import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import sortBy from 'sort-by';
import Select from 'react-select';
import { useRouter } from 'next/router'

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

export function dropdownFilter(arrayData, dataSelected, handleChange, isMulti, isTamedDropdown, tameQuery, isSorter)
{
    const customStylesArrow = {
        dropdownIndicator: base => ({
            ...base,
            color: "grey" // Custom colour
        })
    };

    let hasDefaultValue = [];
    if(isTamedDropdown)
    {
        for(let i = 0; i < arrayData.length; i++) {
            hasDefaultValue = tameQuery === arrayData[i].value ? [arrayData[i]] : hasDefaultValue;
        }
    }
    if(isSorter)
    {
        hasDefaultValue = [arrayData[0]];
    }

    let placeholderString = ''
    placeholderString = dataSelected.includes('sort') ? placeholderString + 'Sort ' : placeholderString + 'Select ';
    placeholderString = dataSelected.includes('Prop') ? placeholderString + 'by property' : placeholderString;
    placeholderString = dataSelected.includes('Order') ? placeholderString + 'by order' : placeholderString;
    placeholderString = !dataSelected.includes('Order')
                        && !dataSelected.includes('Prop')
                        && !dataSelected.includes('sort') ? placeholderString + dataSelected : placeholderString;
    placeholderString = placeholderString + "..."

    return (
        <Select
            name={dataSelected}
            options={arrayData}
            isMulti={isMulti}
            placeholder={<div>{placeholderString}</div>}
            defaultValue={hasDefaultValue}
            isClearable={!isSorter}
            className="basic-select"
            classNamePrefix="select"
            onChange={event => handleChange(dataSelected, event)}
            styles={customStylesArrow}
        />
    )
}

export default function Animals(props) {
    const router = useRouter();
    let tameQuery = (router.query.tame !== undefined && router.query.tame !== "") ? router.query.tame : '';

    const [query, setQuery] = useState({
        search: '',
        type: '',
        habitat: [],
        diet: '',
        location: [],
        tame: tameQuery,
        sortProp: 'name',
        sortOrder: 'AZ'
    });

  const searchFilter = (animalsList) => {
	  return animalsList.filter(
		  (animal) => animal.name.toLowerCase().includes(query.search.toLowerCase())
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
        return resultFilter.sort();
    }
    const typeFilter = (animalsList) => {
        return animalsList.filter(
            (animal) => animal.type.includes(query.type)
        )
    }

    const getArrayFilterByHabitat = () => {
        return [{value: "Air", label: "Air"}, {value: "Land", label: "Land"}, {value: "Water", label: "Water"}];
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
        return resultFilter.sort();
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
        return resultFilter.sort();
    }
    const tameFilter = (animalsList) => {
        return animalsList.filter(
            (animal) => animal.tamed.includes(query.tame)
        )
    }

    const getArraySortByProp = () => {
        return [
            {value: "name", label: "Name"},
            {value: "type", label: "Type"},
            {value: "diet", label: "Diet"},
            {value: "tamed", label: "Tame"}
        ];
    }
    const getArraySortByOrder = () => {
        return [
            {value: "AZ", label: "A-Z"},
            {value: "ZA", label: "Z-A"}
        ];
    }

  let animals = props.animals;
  const orderPrimary = query.sortOrder === 'ZA' ? '-' + query.sortProp : query.sortProp;
  const iconOrder = query.sortOrder === 'ZA' ? "bi bi-sort-alpha-up" : "bi bi-sort-alpha-down";
  animals.sort(sortBy(orderPrimary,'id'));
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
        } else if (selector === "habitats") {
            handleChangeHabitat(event);
        } else if (selector === "diet") {
            handleChangeDiet(event);
        } else if (selector === "locations") {
            handleChangeLocation(event);
        } else if (selector === "tame") {
            handleChangeTame(event);
        } else if (selector === "sortProp") {
            handleChangeSortProp(event);
        } else if (selector === "sortOrder") {
            handleChangeSortOrder(event);
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
    const handleChangeSortProp = (e) => {
        //console.log(e)
        if(e !== null) {
            setQuery({...query, sortProp: e.value})
        }
        else
        {
            setQuery({...query, sortProp: 'name'})
        }
    }
    const handleChangeSortOrder = (e) => {
        //console.log(e)
        if(e !== null) {
            setQuery({...query, sortOrder: e.value})
        }
        else
        {
            setQuery({...query, sortOrder: 'AZ'})
        }
    }

  return (
	<div className={styles.container}>
	  <Head>
		<title>Animal World | List</title>
		<meta name="description" content="A list of animals to search for and filter." />
		<link rel="icon" href="https://joaocupido.github.io/sgm_project/favicon.ico" />
	  </Head>

	  <main>

		<div className="pb-20 pt-4">
            <div className={`${"rounded-2 pt-3 pb-6"} ${styles["filterArea"]}`}>
                <h1 className="justify-content-around pl-2"><i className={`${"bi bi-filter"} ${styles["i"]}`}></i>Filter{" " + query.tame} Animals:</h1>
                <div className="row justify-content-around">
                    <div className={`${"col-sm-6 pt-2 pb-2 pl-2 pr-2"} ${styles["filterSize"]}`}>
                        <input id="inputSearchId" onChange={event => handleChange("search", event)} type='search' className="form-control rounded-1" placeholder='Search animal...'/>
                    </div>
                    <div className={`${"col-sm-6 pt-2 pb-2 pl-2 pr-2"} ${styles["filterSize"]}`}>
                        { dropdownFilter(getArrayFilterByType(animalsDup), "type", handleChange, false, false, tameQuery, false) }
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className={`${"col-sm-6 pt-2 pb-2 pl-2 pr-2"} ${styles["filterSize"]}`}>
                        { dropdownFilter(getArrayFilterByHabitat(), "habitats", handleChange, true, false, tameQuery, false) }
                    </div>
                    <div className={`${"col-sm-6 pt-2 pb-2 pl-2 pr-2"} ${styles["filterSize"]}`}>
                        { dropdownFilter(getArrayFilterByDiet(animalsDup), "diet", handleChange, false, false, tameQuery, false) }
                    </div>
                </div>
                <div className="row justify-content-around">
                    <div className={`${"col-sm-6 pt-2 pb-2 pl-2 pr-2"} ${styles["filterSize"]}`}>
                        { dropdownFilter(getArrayFilterByLocation(), "locations", handleChange, true, false, tameQuery, false) }
                    </div>
                    <div className={`${"col-sm-6 pt-2 pb-2 pl-2 pr-2"} ${styles["filterSize"]}`}>
                        { dropdownFilter(getArrayFilterByTame(animalsDup), "tame", handleChange, false, true, tameQuery, false) }
                    </div>
                </div>
                <h1 className="justify-content-around pl-2"><i className={`${iconOrder} ${styles["i"]}`}></i>Sort Animals:</h1>
                <div className="row justify-content-around">
                    <div className={`${"col-sm-6 pt-2 pb-2 pl-2 pr-2"} ${styles["filterSize"]}`}>
                        { dropdownFilter(getArraySortByProp(), "sortProp", handleChange, false, false, tameQuery, true) }
                    </div>
                    <div className={`${"col-sm-6 pt-2 pb-2 pl-2 pr-2"} ${styles["filterSize"]}`}>
                        { dropdownFilter(getArraySortByOrder(), "sortOrder", handleChange, false, false, tameQuery, true) }
                    </div>
                </div>
            </div>
		</div>

		<div className="row">
		  {animals.map(animal =>
			  <div key={animal.id} className="col-sm-2 pt-2 pb-2 pl-2 pr-2">
				<Link href={"/animals/" + animal.id}>
					<div className={`${"card h-100 text-center"} ${styles["animalCard"]}`}>
						<img className="card-img-top" src={((animal.first_image)[0]).imagelink} alt={((animal.first_image)[0]).alt}/>
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
