import AddIcon from '@mui/icons-material/Add';
import { useSearch } from '../contexts/SearchContext';

export default function AddShowComponent(){
    const { focusSearch } = useSearch();

    return(
        <>
            <div style={{
                    width: 200, 
                    height: 350, 
                    border:"white 1pt solid",
                    display:"flex", 
                    justifyContent:"center", 
                    alignItems:"center"

                }}
                className="add-show-card"
                onClick={focusSearch} >
                <AddIcon fontSize="large"/>
            </div>
        </>
    )
}