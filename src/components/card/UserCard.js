import React, { useContext } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SimpleModal from "../modal/Modal";
import "./UserCard.css";
import { DataContext } from "../../context/DataContext";

function UserCard(props) {
    const value = useContext(DataContext);
    return (
        <div className="card">
            {value.map(user => (
                <Card className="card__outer" key={user.id}>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom className="card__name">
                            Name: {user.real_name}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom className="card__id">
                            Id: {user.id}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <div className="btns">
                            <SimpleModal id={user.id} />
                            <SimpleModal id={user.id} calender />

                        </div>
                    </CardActions>
                </Card>
            ))}

        </div>
    )
}

export default UserCard