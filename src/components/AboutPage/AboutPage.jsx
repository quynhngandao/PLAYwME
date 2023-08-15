import { Typography, List, ListItem, Box, Grid } from "@mui/material";

function AboutPage() {
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Grid
      container
      spacing={2}
      columns={16}
      className="aboutPage"
      sx={{ justifyContent: "center", p:"auto"}}
    >
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          textAlign: { xs: "center", sm: "center" },
          alignItems: "center",
          justifyItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ textAlign: "center", alignContent: "center" }}>
          <Typography
            sx={{ fontFamily: "varela round", fontWeight: 800 }}
            variant="h3"
            gutterBottom
          >
            About
          </Typography>
          <Typography
            sx={{
              fontFamily: "varela round",
              fontWeight: 500,
              variant: "body1",
          
            }}
          >
            PLAYwME: A platform to bridge the gap between animal lovers who want
            to contribute to bettering the well-being of shelter animals.
            PLAYwME was designed with empathy and purpose, connecting users with
            their local animal shelters. With your participation in using
            PLAYwME, you can make a meaningful difference in the lives of these
            animals and increase their chances of finding loving homes.
          </Typography>

          <Box sx={{ textAlign: "center", alignContent: "center", pt:5 }}>
            <img
              width="150"
              height="50"
              src="https://hirechamp.com/wp-content/uploads/2017/04/LinkedIn-button-Connect-With-Me.jpg"
            />
            <br />
            <img
              width="150"
              height="150"
              src="https://scontent-msp1-1.xx.fbcdn.net/v/t1.15752-9/365384761_1121952718763948_2083754579984283983_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=j5cRm39PUI4AX8pqhNU&_nc_ht=scontent-msp1-1.xx&oh=03_AdQtvrd-zp0oxvfJE1O1EG-Zton0QAkbRUQp7N4j6ii49g&oe=64FF6A34"
            />
          </Box>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          textAlign: { xs: "center", sm: "center" },
          alignItems: "center",
          justifyItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box item textAlign="center">
          <Grid>
            <Typography
              sx={{ fontFamily: "varela round", fontWeight: 800 }}
              variant="h3"
              gutterBottom
            >
              Next Step
            </Typography>
          </Grid>
          <Grid>
            <Box sx={{ textAlign: "center", alignContent: "center" }}>
              <Typography sx={{ fontFamily: "varela round", fontWeight: 500 }}>
                Scaling the project
              </Typography>

              <Typography sx={{ fontFamily: "varela round", fontWeight: 500 }}>
                Allow pets owners to connect
              </Typography>
            </Box>
          </Grid>
        </Box>

        <Box item textAlign="center">
          <Typography
            sx={{ fontFamily: "varela round", fontWeight: 800 }}
            variant="h3"
            gutterBottom
          >
            Technologies
          </Typography>

          <Box sx={{ textAlign: "center", alignContent: "center" }}>
            <Typography sx={{ fontFamily: "varela round", fontWeight: 500 }}>
              React
            </Typography>

            <Typography sx={{ fontFamily: "varela round", fontWeight: 500 }}>
              Redux/Redux-Saga
            </Typography>

            <Typography sx={{ fontFamily: "varela round", fontWeight: 500 }}>
              Node/Express
            </Typography>

            <Typography sx={{ fontFamily: "varela round", fontWeight: 500 }}>
              PostgreSQL
            </Typography>

            <Typography sx={{ fontFamily: "varela round", fontWeight: 500 }}>
              Material UI
            </Typography>

            <Typography sx={{ fontFamily: "varela round", fontWeight: 500 }}>
              RESTful API
            </Typography>
          </Box>
        </Box>

        <Box item textAlign="center">
        <Typography
            sx={{ fontFamily: "varela round", fontWeight: 800 }}
            variant="h3"
            gutterBottom
          >
            Acknowledgment
          </Typography>

          <Box sx={{ textAlign: "center", alignContent: "center" }}>
            <Typography sx={{ fontFamily: "varela round", fontWeight: 500 }}>
              Friends & Family
            </Typography>

            <Typography sx={{ fontFamily: "varela round", fontWeight: 500 }}>
              ALL the wonderful Prime Staff
            </Typography>
            <Typography sx={{ fontFamily: "varela round", fontWeight: 500 }}>
              EMERALD Cohort
            </Typography>
            <Typography
              sx={{
                fontFamily: "varela round",
                fontWeight: 500,
                fontSize: 10,
              }}
            >
              Instructor: Emma
              <br />
              Classmates: Amy, Aubrey, Georgie, Jon, Peder, Sam, Savon, Zach,
              Zakariye, Justin
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
    </Box>
  );
}

export default AboutPage;
