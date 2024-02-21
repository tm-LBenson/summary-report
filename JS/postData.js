export async function postData(
  endPoint = '',
  data = {},
  // url = 'https://astro-server-z1u9.onrender.com/'
  url = 'http://localhost:3002/'
) {
  try {
    const response = await fetch(url + endPoint, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
