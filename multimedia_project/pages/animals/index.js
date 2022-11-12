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

export function dropdownFilter(arrayData, dataSelected, handleChange)
{
    return (
        <Select
            name={dataSelected}
            options={arrayData}
            placeholder={<div>Search type...</div>}
            isClearable="true"
            className="basic-select"
            classNamePrefix="select"
            onChange={event => handleChange("type", event)}
        />
    )
}

export default function Animals(props) {
  const [query, setQuery] = useState('');
  const [queryType, setQueryType] = useState('');

  const searchFilter = (animalsList) => {
	  return animalsList.filter(
		  (animal) => animal.id.includes(query)
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
            (animal) => animal.type.includes(queryType)
        )
    }

  let animals = props.animals;
  animals = searchFilter(animals);
  animals = typeFilter(animals);
  animals.sort(sortBy('name','id'));

    const handleChange = (selector, event) => {
        if (selector === "search") {
            handleChangeSearch(event);
        } else if (selector === "type") {
            handleChangeType(event);
        }
    }

    const handleChangeSearch = (e) => {
        setQuery(e.target.value)
    }

    const handleChangeType = (e) => {
        //console.log(e)
        if(e !== null) {
            setQueryType(e.value)
        }
        else
        {
            setQueryType("")
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
            <div className="row">
                <div className="col-sm-2 pt-2 pb-2 pl-2 pr-2">
                    <input onChange={event => handleChange("search", event)} type='search' className="form-control w-100" placeholder='Search...'/>
                </div>
                <div className="col-sm-2 pt-2 pb-2 pl-2 pr-2">
                    { dropdownFilter(getArrayFilterByType(animals), "Type", handleChange) }
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
