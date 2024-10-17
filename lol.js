async function doThing() {
  const response = await fetch("http://localhost:3000/api/test");
  const data = await response.json();
  console.log(data);
}

doOtherThing();

async function doOtherThing() {
  const payload = {
    macAddr: "12kj3h",
  };

  try {
    const response = await fetch("http://localhost:3000/api/register-new-device", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : ''
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error posting data:", error);
  }
}
