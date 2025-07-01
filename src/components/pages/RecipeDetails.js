import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, Image, Header, Segment, Dropdown } from 'semantic-ui-react';
import Loader from '../layout/Loader';
import { RECIPE_API } from '../../config';
import userRecipes from '../../data/userRecipes';

const languageOptions = [
  { key: 'en', value: 'en', text: 'English' },
  { key: 'es', value: 'es', text: 'Spanish' },
  { key: 'fr', value: 'fr', text: 'French' },
  { key: 'de', value: 'de', text: 'German' },
  { key: 'zh', value: 'zh', text: 'Chinese' },
  // Add more languages as needed
];

function RecipeDetails(props) {
  const [state, setState] = useState({ recipe: {}, loading: true });
  const [language, setLanguage] = useState('en');
  const [translatedIngredients, setTranslatedIngredients] = useState([]);
  const [translatedDescription, setTranslatedDescription] = useState('');

  useEffect(() => {
    const getRecipe = async () => {
      try {
        // Check if user recipe
        const userRecipe = userRecipes.find(r => r.id === props.match.params.recipe_id);
        if (userRecipe) {
          setState({ recipe: userRecipe, loading: false });
          translateContent(userRecipe.ingredients, userRecipe.description, language);
        } else {
          const response = await fetch(`${RECIPE_API}/get?rId=${props.match.params.recipe_id}`);
          const result = await response.json();
          setState({ recipe: result.recipe, loading: false });
          translateContent(result.recipe.ingredients, result.recipe.description || '', language);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getRecipe();
    //eslint-disable-next-line
  }, [props.match.params.recipe_id]);

  useEffect(() => {
    if (!state.loading) {
      translateContent(state.recipe.ingredients, state.recipe.description || '', language);
    }
    //eslint-disable-next-line
  }, [language]);

  const translateContent = async (ingredients, description, lang) => {
    if (lang === 'en') {
      setTranslatedIngredients(ingredients);
      setTranslatedDescription(description);
      return;
    }
    try {
      const translateText = async (text) => {
        const response = await fetch('https://libretranslate.de/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: text,
            source: 'en',
            target: lang,
            format: 'text'
          }),
        });
        const data = await response.json();
        return data.translatedText;
      };

      const translatedIngrPromises = ingredients.map(i => translateText(i));
      const translatedIngr = await Promise.all(translatedIngrPromises);
      const translatedDesc = description ? await translateText(description) : '';
      setTranslatedIngredients(translatedIngr);
      setTranslatedDescription(translatedDesc);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedIngredients(ingredients);
      setTranslatedDescription(description);
    }
  };

  if (state.recipe) {
    return (
      <Grid container stackable columns={2} className="detailPageContent">
        <Grid.Column>
          <Button
            as={Link}
            to="/recipes"
            color="yellow"
            content="Back to recipe list"
            style={{ marginBottom: '3rem' }}
          />
          {state.loading && <Loader />}
          <Image src={state.recipe.image_url || state.recipe.image} />
        </Grid.Column>
        <Grid.Column>
          <Header size="medium">{state.recipe.title}</Header>
          <p className="text-cursive txt-yellow">Provided By {state.recipe.publisher || state.recipe.cuisine}</p>
          <Button
            as="a"
            href={state.recipe.publisher_url}
            target="_blank"
            color="blue"
            content="Publisher Webpage"
          />
          <Button
            as="a"
            href={state.recipe.source_url}
            target="_blank"
            color="green"
            content="Recipe URL"
          />

          <Header size="medium" content="Select Language for Translation" />
          <Dropdown
            placeholder="Select Language"
            fluid
            selection
            options={languageOptions}
            value={language}
            onChange={(e, { value }) => setLanguage(value)}
            style={{ marginTop: '0.5rem', marginBottom: '1rem' }}
          />
          <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#666' }}>
            Select a language to translate the ingredients and procedure below.
          </p>

          <Header size="large" content="Ingredients" />
          <Segment.Group>
            {translatedIngredients &&
              translatedIngredients.map((ingred, i) => (
                <Segment key={i}>
                  <h5 className="text-cursive">{ingred}</h5>
                </Segment>
              ))}
          </Segment.Group>

          {translatedDescription && (
            <>
              <Header size="large" content="Description" />
              <Segment>
                <p className="text-cursive">{translatedDescription}</p>
              </Segment>
            </>
          )}
        </Grid.Column>
      </Grid>
    );
  } else {
    return (
      <Grid container stackable columns={2} className="detailPageContent">
        <Header>Nothing found !!</Header>
      </Grid>
    );
  }
}
export default RecipeDetails;
