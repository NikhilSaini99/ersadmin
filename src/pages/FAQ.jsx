import { Box, Typography, Button, Grid, TextField, Divider, CardActions, InputLabel, FormControl, MenuItem, Select, Stack, IconButton, Collapse } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import MainCard from '../components/MainCard'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react'
import LoaderContainer from '../components/LoaderContainer'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpIcon from '@mui/icons-material/Help';
import { useState } from 'react'
import { SubHeader } from '../layouts/MainLayout';
import EmptyRecords from '../components/EmptyRecords/EmptyRecords'
import CustomModal from '../components/Modal/Modal'
import { RequestLoader } from '../components/Spinner'

const FAQ = () => {
    const { data: faqData, callAPI, loading, error } = useFetch('get', '/faq')

    useEffect(() => {
        callAPI()
    }, [])

    const myBox = {
        display: 'flex',
        justifyContent: 'flex-end',
        color: '#72b8bf',
        pb: "1rem",
    }
    return (
        <>
            <SubHeader title={'ALL FAQ QUESTIONS'} />
            <LoaderContainer {...{ loading, error }}>
            <Box
					sx={{
						width: '100%',
						margin: { xs: '0 auto', lg: '0  auto' },
						px: { md: '3rem', lg: '5rem,', xl: '10rem' },
						py: '1rem'
					}}
				>
                <Stack sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', mt: '1rem', ml: '2rem' }}>

                    <Box sx={myBox}>
                        <Link to="/AddFAQ">
                            <Button
                                variant="contained"
                                size="large"
                                sx={{ fontWeight: 600, py: 1.5 }}
                            // startIcon={<BiAddToQueue size={20} />}
                            >
                                {' '}
                                Add FAQ
                            </Button>
                        </Link>
                    </Box>

                    { faqData?.data?.length===0 ? <EmptyRecords/> :faqData?.data?.map((item, index) => (
                        <MyFAQPrint
                            key={index}
                            myidx={index}
                            id={item.id}
                            question={item.question}
                            answer={item.answer}
                            category={item.question_cat}
                            refresh={callAPI}
                            Faq={item}
                        />
                    ))}
                </Stack>
                </Box>
            </LoaderContainer>

        </>
    )
}

export default FAQ

/*---------- PRINT FAQ STARTS ---------------*/

const MyFAQPrint = ({ id, question, answer, refresh, Faq }) => {
    const [OpenModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const { loading, data, error, callAPI } = useFetch('DELETE', `/faq/${id}`);

    useEffect(() => {
        if (data?.success) refresh();
    }, [data])


    const [ans, setShowAns] = useState(false)

    function handleShow() {
        setShowAns(!ans)
    }

       
	function handleModal() {
		setOpenModal(true)
	}

	const handleClose = () => {
		setOpenModal(false);
	};

    const handleUpdate = ()=>{
        navigate("/AddFAQ", {state: {formdata: Faq, status: true}})
    }

    return (
        <>
            <Stack sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack sx={{
                    display: 'flex', flexDirection: 'column', background: '#F4F3F6', p: '1rem',
                    borderRadius: '10px', flexGrow: '1'
                }}>
                    <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Stack direction='row' spacing={2}><HelpIcon />
                            <Typography variant='body1' fontWeight='bold'>
                                {question}
                            </Typography>
                        </Stack>
                        <IconButton onClick={() => handleShow()}>
                            {ans ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    </Stack>

                    <Collapse in={ans}>
                        <Typography variant='body1'
                            sx={{
                                color: 'grey',
                                pl: '0.5rem',
                                ...(ans ? {
                                    display: 'block',
                                } : {
                                    display: 'none',
                                }),
                            }}
                        >{answer}</Typography>
                    </Collapse>
                </Stack>
                <Button variant='contained' onClick={handleModal}>Delete</Button>
                <Button variant='contained' onClick={handleUpdate}>Update</Button>
                <CustomModal  isOpen={OpenModal} handleClose={handleClose} handleDelete={callAPI}/>
            </Stack>
        </>
    )
}

/*---------- PRINT FAQ STARTS ---------------*/



/* ----------------------ADD FAQ PAGE STARTS------------------ */
export const AddFAQ = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
    console.log("form data", location?.state );
    const { callAPI } = useFetch('POST', '/faq')
    const { callAPI: updateformAPI } = useFetch(
		'PUT',
		`/faq/${location?.state?.formdata?.id}`
	);

    const isUpdate = location?.state?.status;
    const {use_for: UpdateUserFor,
         question: UpdateQuestion,
         answer: UpdateAnswer,
         question_cat: UpdateQuestionCat} = location.state.formdata

    //using formik library to manage overall form and in formik also using useFormik hook

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            if (isUpdate) {
                updateformAPI(formik.values);
            } else {
                callAPI(formik.values);
            }
            navigate('/FAQ');
            formik.handleReset();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    
    const formik = useFormik({
        initialValues: {
            use_for: isUpdate ? UpdateUserFor : 'Home',
            question: isUpdate? UpdateQuestion : '',
            answer: isUpdate? UpdateAnswer : '',
            question_cat: isUpdate? UpdateQuestionCat : ''
        },
        onSubmit: handleSubmit

    })

    return (
        <>
            <SubHeader title="ALL FAQ QUESTIONS" />
            <MainCard
                border={false}
                elevation={16}
                content={false}
                boxShadow
            >
              <Box sx={{ p: '1em 4rem 2rem 2rem' }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container direction="column" spacing={2} padding={4}>
                        <Grid item xs={12}>

                            <FormControl sx={{ width: { xs: '60%', md: '50%', lg: '40%' }, }}>
                                <InputLabel id="question_cat">Select Category</InputLabel>
                                <Select
                                    labelId="question_cat"
                                    id="question_cat"
                                    name="question_cat"
                                    value={formik.values.question_cat}
                                    label="Select category"
                                    onChange={formik.handleChange}
                                    required
                                >
                                    <MenuItem value={'Corporate'}>Corporate</MenuItem>
                                    <MenuItem value={'VAT'}>VAT</MenuItem>
                                    <MenuItem value={'Income Tax'}>Income Tax</MenuItem>
                                    <MenuItem value={'Custom and Excise'}>Custom and Excise</MenuItem>
                                    <MenuItem value={'e-Tax'}>e-Tax</MenuItem>
                                    <MenuItem value={'Ayscuda World'}>Ayscuda World</MenuItem>
                                    <MenuItem value={'Sekulula VAT Easy'}>Sekulula VAT Easy</MenuItem>
                                    <MenuItem value={'Alcohol and Tabaco Levy'}>Alcohol and Tabaco Levy</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Use For"
                                id="fullWidth"
                                name='use_for'
                                helperText="Use For"
                                onChange={formik.handleChange}
                                value={formik.values.use_for}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Question"
                                id="fullWidth"
                                name='question'
                                helperText="Please enter Question"
                                onChange={formik.handleChange}
                                value={formik.values.question}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Answer"
                                id="fullWidth"
                                name='answer'
                                multiline
                                helperText="Please enter Answer"
                                onChange={formik.handleChange}
                                value={formik.values.answer}
                                required
                            />
                        </Grid>


                        <Divider sx={{ p: 2 }} />
                        <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                            <Button type="submit" size="large" variant="contained" >
                                {loading ? <RequestLoader/> : isUpdate ? "Update":  "Save"}
                            </Button>
                        </CardActions>
                    </Grid>
                </form>
                </Box>
            </MainCard>
        </>
    )
}
