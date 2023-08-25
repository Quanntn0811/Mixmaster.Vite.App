import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  Landing,
  About,
  Cocktail,
  Newsletter,
  HomeLayout,
  Error,
  SinglePageError,
} from './pages/index'

import { loader as landingLoader } from './pages/Landing'
import { loader as singleCocktailLoader } from './pages/Cocktail'
import { action as newsletterAction } from './pages/Newsletter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        loader: landingLoader(queryClient),
        errorElement: <SinglePageError></SinglePageError>,
        element: <Landing />,
      },
      {
        path: 'cocktail/:id',
        errorElement: <SinglePageError></SinglePageError>,
        loader: singleCocktailLoader(queryClient),
        element: <Cocktail />,
      },
      {
        path: 'newsletter',
        action: newsletterAction,
        element: <Newsletter />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
])

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  )
}
export default App
