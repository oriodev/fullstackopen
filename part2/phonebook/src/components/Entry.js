export const Entry = ( { person, deleteEntry } ) => {
    return (
    <li> 
        {person.name} 
        {person.number}
        <button onClick={deleteEntry}>Delete</button>
    </li>
    )
}