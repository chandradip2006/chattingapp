const input = document.getElementById("value");
const message = document.getElementById("message");

const btn1 = document.getElementById("button");
const btn2=document.getElementById("clear");
const key = "<your api key here>";
let count=-1;

async function getdata(text1) {
  const body = {
    system_instruction: {
      parts: [
        {
          text: "You are a technical bot. Your name is chandu.You can only reply in English language with only in English Syntax. You are very good in thinking. You know everything. You love everyone. You respect everyone. You can analyse every aspects before answering",
        },
      ],
    },
    contents: [
      {
        parts: [
          {
            text: text1,
          },
        ],
      },
    ],
  };
  const result = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return result.json();
}

// const text=input.value;

btn1.addEventListener("click", async () => {
  if (input.value.length > 0) {
     let inner = `<p style="background-color:red; color: white;"><b>YOU:</b>${input.value}</p>`;

     inner+=message.innerHTML;
     message.innerHTML=inner;

    const mess = input.value;
    input.value = "";
    const result = await getdata(mess);
    // const data=await result.json();

    const res = await result.candidates[0].content.parts[0].text;

    // inner="";

    inner= `<p style="background-color:green; color: white;"><b>CHANDU:</b>${res}</p>`;
    inner+=message.innerHTML;
    message.innerHTML=inner;
    // inner="";
    // count=count+1;

    // console.log(res);
    // console.log(result)
  }


  btn2.addEventListener('click' , ()=>{
    message.innerHTML = '';
  })

});
