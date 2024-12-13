import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600, // Ajusta el ancho del modal aquí
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface CustomizedMenusProps {
  rowData: {
    descripcion: string;
    fecha: string;
    id: number;
    local_id: string;
    tipo: string;
  }; 
}

export default function CustomizedMenus({ rowData }: CustomizedMenusProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSolventar = () => {
    console.log('Solventar:', rowData);
    handleClose();
  };

  const handleSolventarTodo = () => {
    console.log('Solventar Todo');
    handleClose();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    console.log("🚀 ~ CustomizedMenus ~ description:", rowData.descripcion);
    handleClose(); // Cierra el menú al abrir el modal
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Tooltip title="Solventar" arrow>
          <MenuItem onClick={handleSolventar} disableRipple>
            <CheckIcon />
            Solventar
          </MenuItem>
        </Tooltip>
        <Tooltip title="Solventar Todo" arrow>
          <MenuItem onClick={handleSolventarTodo} disableRipple>
            <DoubleArrowIcon />
            Solventar Todo
          </MenuItem>
        </Tooltip>
        <Tooltip title="More" arrow>
          <MenuItem onClick={handleOpenModal} disableRipple>
            <MoreHorizIcon />
            More
          </MenuItem>
        </Tooltip>
      </StyledMenu>

      {/* Modal para mostrar la descripción del incidente */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <strong>Descripción del Incidente con ID:</strong> {rowData.id}
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              maxHeight: '400px',
              overflowY: 'auto',
              wordWrap: 'break-word',
            }}
          >
            <strong>Descripción:</strong> {rowData.descripcion}<br />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
