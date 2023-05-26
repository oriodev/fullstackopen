import { Entry } from "./Entry"

const DisplayEntries = ( {entriesToShow, deleteEntry} ) => {
    
    return (
      <ul>
        {entriesToShow.map(person => 
              <Entry 
                key={person.id}
                person={person}
                deleteEntry={() => deleteEntry(person.id)}
              />
          )}

      </ul>
    )
}

export default DisplayEntries