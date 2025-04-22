import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./Help.css";
import FAQ from "../../assets/images/FAQ21.jpg";
export default function SimpleAccordion() {
  return (
    <>
      <div className='helppage'>
     
      <img src={FAQ} alt="FAQ Image" style={{ height: '510px', width: '700px' }} />
      <h1>DO YOU HAVE QUESTIONS ?</h1>

      
    <div className='accordion-container'>
      <Accordion className='helpdrop'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            
            <Typography className='accordion-header'>{"Why Text is disappearing in 'Batches Attending' ?"}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography >
              1. This field shows the target batches which will be present in LT.
            </Typography>
            <Typography>
              2. Please enter the batch numbers in the following format: 18 19 20.
            </Typography>
            <Typography>
              3. If you enter more than three decimal places, the extra digits will be ignored.
            </Typography>
            <Typography>
              4. Kindly input each batch as one or two digits, and separate them with spaces.
            </Typography>
          </AccordionDetails>
        </Accordion>





        <Accordion className='helpdrop'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className='accordion-header'>How can I book an LT ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography>
              1. Timetables are viewable without logging in.
            </Typography>
            <Typography>
              2. Selecting any cell prompts a login request.
            </Typography>
            <Typography>
              3. After logging in, selecting a cell opens a booking page.
            </Typography>
            <Typography>
              4. Fill in necessary details such as LT Number, select start and end date, etc., and submit for approval.
            </Typography>
            <Typography>
              5. Your request will appear on the timetable as a yellow block until approved.
            </Typography>
            {/* <img src="./images/yellow.jpg"/> */}
          </AccordionDetails>
        </Accordion>
                <Accordion className='helpdrop'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className='accordion-header'>Who can book an LT ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              
              1. Users who have logged in can request to book LTs.
            </Typography>
            <Typography>
              2. Superadmins can directly book LTs without any approvals.
            </Typography>
            <Typography>
              3. Regular admins do not have the capability to book LTs.
            </Typography>
          </AccordionDetails>
        </Accordion>


        <Accordion className='helpdrop'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className='accordion-header'>Why my Page says Access Denied ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              1. If you are a normal user, you cannot approve request, add Lts or create new users.
            </Typography>
            <Typography>
              2. If you are an admin, you cannot book LTs by yourself you need to contact the superadmin.
            </Typography>
            <Typography>
              3. Normal admins cannot book LTs.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className='helpdrop'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className='accordion-header'>How to create an account ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              1. Ensure that the reservation for the LT is made at least three days before the event.
            </Typography>
            <Typography>
              2. To provide an illustration, if today is the 23rd of November, you may commence booking slots starting from the 26th of November onwards.
            </Typography>
          </AccordionDetails>
        </Accordion>


      <Accordion className='helpdrop'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className='accordion-header'>Page says please book a slot at least 3 days earlier</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              1. You must book the LT atleast 3 days prior to the event.
            </Typography>
            <Typography>
              2. For example if today is 23rd november you can book slots from 26th november onwards.
            </Typography>
          </AccordionDetails>
        </Accordion>


        <Accordion className='helpdrop'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
             <Typography className='accordion-header'>Slots already occupied</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              This message is displayed when you try to book a slot which is:
            </Typography>
            <Typography>
              1. Already booked.
            </Typography>
            <Typography>
              2. or has some request pending approval.
            </Typography>
          </AccordionDetails>
          </Accordion>
          </div>
        </div>
</>
);
}
