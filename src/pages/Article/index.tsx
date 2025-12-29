import { Helmet } from '@dr.pogodin/react-helmet'

import PageTitleWrapper from '../../components/PageTitleWrapper'
import PageHeader from '../../components/PageHeader'
import { Box, Grid } from '@mui/material'
import ArticleDetails from './ArticleDetails'

const index = () => {
  return (
    <div>
   <Helmet>
        <title>Article</title>
      </Helmet>
         <PageTitleWrapper>
      <PageHeader title ="Article" btntitle="Add Employee" icon={""} />
      </PageTitleWrapper>
    

         <Box sx={{ maxWidth: "95%", }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={0}
        >
          <Grid size={{xs:12}}>
             <ArticleDetails/>
        </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default index
