import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
type HeaderProps = {
    title: string;
  
  };
  
const Header : React.FC<HeaderProps>   = ({title})=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return <Box mb="15px" sx={{marginX: 'auto', marginY:'auto'}}>
        {/*
        <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{mb:"5px"}}>
            {title}
        </Typography>
        */}
            <Typography variant="h2" color={colors.greenAccent[400]}>
                {title}
            </Typography>
        </Box>
}
export default Header;