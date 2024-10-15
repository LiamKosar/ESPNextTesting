async function doThing() {
  const response = await fetch("http://localhost:3000/api/test");
  const data = await response.json();
  console.log(data);
}

doOtherThing();

async function doOtherThing() {
  const payload = {
    key1: "value1",
    key2: 123
  };

  try {
    const response = await fetch("http://localhost:3000/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error posting data:", error);
  }
}
