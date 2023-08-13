import { Typography, List, ListItem, Box, Grid } from "@mui/material";

function AboutPage() {
  return (
    <Grid container spacing={2} columns={16} className="aboutPage">
      <Grid item sx={{ textAlign: "center" }} xs={8}>
        <Typography
          sx={{ fontFamily: "varela round", fontWeight: 800 }}
          variant="h3"
          gutterBottom
        >
          About
        </Typography>

        <Typography
          sx={{ fontFamily: "varela round", textAlign: "center" ,fontWeight: 600, maxWidth:800, ml:2, p:2, pb:0 }}
          variant="body1"
        >
          PLAYwME: A platform to bridge the gap between animal lovers who want
          to contribute to bettering the well-being of shelter animals. PLAYwME
          was designed with empathy and purpose, connecting users with their
          local animal shelters. With your participation in using PLAYwME, you
          can make a meaningful difference in the lives of these animals and
          increase their chances of finding loving homes.
        </Typography>
        <Box justifyItems="center" sx={{m:5}}>
          <img width="200" height="50" src="https://hirechamp.com/wp-content/uploads/2017/04/LinkedIn-button-Connect-With-Me.jpg"/>
          <br/>
          <img src="https://scontent-msp1-1.xx.fbcdn.net/v/t1.15752-9/365384761_1121952718763948_2083754579984283983_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=j5cRm39PUI4AX8pqhNU&_nc_ht=scontent-msp1-1.xx&oh=03_AdQtvrd-zp0oxvfJE1O1EG-Zton0QAkbRUQp7N4j6ii49g&oe=64FF6A34" />
        </Box>
      </Grid>

      <Grid item sx={{ textAlign: "center" }} xs={8}>
        <Box item textAlign="center">
          <Grid>
            <Typography
              sx={{ fontFamily: "varela round", fontWeight: 800, p:1}}
              variant="h3"
              gutterBottom
            >
              Next Step
            </Typography>
          </Grid>
          <Grid>
            
              <Box
                sx={{ m: 0, p: 0, textAlign: "center", alignContent: "center" }}
              >
              <Typography sx={{m: 1, fontFamily: "varela round", fontWeight: 500 }}>
                  Scaling the project
                </Typography>

                <Typography sx={{m: 1, fontFamily: "varela round", fontWeight: 500 }}>
                  Allow pets owners to connect
                </Typography>
              </Box>
    
          </Grid>
        </Box>

        <Box item textAlign="center">
          <Typography
               sx={{ fontFamily: "varela round", fontWeight: 800, p:1}}
            variant="h3"
            gutterBottom
          >
            Technologies
          </Typography>

          <Box sx={{ textAlign: "center", alignContent: "center" }}>
            <Typography sx={{m: 1, fontFamily: "varela round", fontWeight: 500 }}>
              React
            </Typography>

            <Typography sx={{m: 1, fontFamily: "varela round", fontWeight: 500 }}>
              Redux/Redux-Saga
            </Typography>

         <Typography sx={{m: 1, fontFamily: "varela round", fontWeight: 500 }}>
              Node/Express
            </Typography>

         <Typography sx={{m: 1, fontFamily: "varela round", fontWeight: 500 }}>
              PostgreSQL
            </Typography>

         <Typography sx={{m: 1, fontFamily: "varela round", fontWeight: 500 }}>
              Material UI
            </Typography>

         <Typography sx={{m: 1, fontFamily: "varela round", fontWeight: 500 }}>
              RESTful API
            </Typography>
          </Box>
        </Box>

        <Box item textAlign="center">
          <Typography
             sx={{ fontFamily: "varela round", fontWeight: 800, p:1}}
            variant="h3"
            gutterBottom
          >
            Acknowledgment
          </Typography>
        
          <Box
                sx={{ textAlign: "center", alignContent: "center" }}
              >
           <Typography sx={{m: 1, fontFamily: "varela round", fontWeight: 500 }}>
                Friends & Family{" "}
              </Typography>
        
            
           <Typography sx={{m: 1, fontFamily: "varela round", fontWeight: 500 }}>
                <b>EMERALD Cohort:</b> My instructor & all my classmates
              </Typography>
        
            
           <Typography sx={{m: 1, fontFamily: "varela round", fontWeight: 500 }}>
                ALL the wonderful Prime Staff
              </Typography>
        
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AboutPage;
