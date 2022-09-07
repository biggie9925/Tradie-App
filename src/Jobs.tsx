import classes from './Jobs.module.css';
import { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import Card from '@material-ui/core/Card'
import data from './data/db.json';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'






export const Jobs = (props: any) => {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/jobs')
            .then(res => res.json())
            .then(data => setJobs(data))
    }, [])


    // const renderPosts = async () => {
    //     let uri = "http://localhost:3001/jobs"

    //     const res = await fetch(uri);
    //     const posts = await res.json();

    //     console.log(posts);
    // }
    // renderPosts();
    // window.addEventListener('DOMContentLoaded', () => renderPosts());

    const handleDelete = async (id: any) => {
        await fetch('http://localhost:3001/jobs/' + id, {
            method: 'DELETE'
        })
        const newJobs = jobs.filter(job => job['id'] != id)
        setJobs(newJobs)
    }


    return (
        <section className={classes.background}>
            <h1 className={classes.title}>Pending Jobs</h1>
            <Container>
                <Grid container spacing={3}>
                    {jobs.map(job => (
                        <Grid item xs={12} md={6} lg={4} key={job['id']}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" component="span" color="textPrimary">
                                    Job ID: {job['id']} <br></br>
                                    Status: {job['status']} <br></br>
                                    Date Created: {job['todays_date']} <br></br>
                                    Customer Name: {job['customer_name']} <br></br>
                                    Customer Phone: {job['customer_phone']} <br></br>
                                    Comments: {job['comments']}
                                </Typography>
                                <Grid container justifyContent="flex-end" alignItems="flex-end">
                                    <IconButton style={{ bottom: 3, left: 3 }} onClick={() => handleDelete(job['id'])}>
                                        <DeleteOutlined />
                                    </IconButton>
                                </Grid>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </section>
    );
}

export default Jobs;


