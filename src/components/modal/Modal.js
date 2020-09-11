import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { DataContext } from "../../context/DataContext";
import Fab from '@material-ui/core/Fab';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    custom: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px"
    },
    para: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px"
    },
    floating: {
        float: "left",
        width: "50%"
    }
}));

export default function SimpleModal({ id, calender }) {
    const value = useContext(DataContext);
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [openList, setOpenList] = React.useState(false);
    const [today, setToday] = React.useState();
    const [total, setTotal] = React.useState();

    var curday = function (sp) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //As January is 0.
        var yyyy = today.getFullYear();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return (mm + sp + dd + sp + yyyy);
    };

    const handleOpen = () => {
        setOpen(true);
        const a = value.filter((user) => {
            return (user.id === id)
        });
        const d = new Date(curday('-')).getTime();
        const d1 = a[0].activity_periods.filter(ele => {
            return (new Date(ele.start_time.slice(0, -10))).getTime() === d;
        });
        setToday(d1);
    };

    const handleOpenList = () => {
        setOpenList(true);
        const a = value.filter((user) => {
            return (user.id === id)
        });
        setTotal(a[0].activity_periods);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenList(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title" className={classes.custom}>Today's Active Time</h2>
            <p id="simple-modal-description" className={classes.para}>
                {typeof today !== 'undefined' && today.length > 0 ? `From : ${today[0].start_time} To : ${today[0].end_time}` : "No Data for Today"}
            </p>
        </div>
    );
    const listBody = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title" className={classes.custom}>All Active Times</h2>
            <div className={classes.floating}><p>From </p></div><div className={classes.floating}><p>To</p></div>
            {total && total.map(item => <><div className={classes.floating}><p>{item.start_time} </p></div><div className={classes.floating}><p>{item.end_time}</p></div></>)
            }
        </div >
    );
    return (
        <div>
            {calender ? <Fab size='small' onClick={handleOpenList}><CalendarTodayIcon /></Fab> :
                <button type="button" onClick={handleOpen} style={{ padding: "10px", marginRight: "30px", marginLeft: "20px" }}>
                    View Today's Activity
            </button>}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
            <Modal
                open={openList}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {listBody}
            </Modal>
        </div>
    );
}