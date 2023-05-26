export const GetMethod = async(url: string) => {
    const GET = await fetch(url, {
      method: "GET"
    })
    .then(res => res.json())
    .catch(error => {
      console.error('通信に失敗しました', error);
    });
    return GET;
  }
  
  export const DeleteMethod = async(id: string) => {
    const url = "https://todolist-team1.deno.dev/api/todo"
    const Delete = await fetch(`${url}/${id}`, {
      method: "DELETE",
      mode: "cors",
    })
    .then(res => {
      if(!res.ok) {
        console.log('サーバーエラー')
      }
    })
    return Delete
  }
  
  export const POSTMethod = async(url = "https://todolist-team1.deno.dev/api/todo", text: string) => {
    const postData = {name : text}
    const Post = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData),
      mode: "cors"
    })
    .then(response => {
      if (!response.ok) {
        console.error('サーバーエラー');
      }
      return response.json()
    })
    .catch(error => {
      console.error('通信に失敗しました', error);
    });
    return Post
  }
  
  export const ChangeCheckboxMethod = async(id?: string, status?: Object) => {
    const url = "https://todolist-team1.deno.dev/api/todo"
    const POST = await fetch(`${url}/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(status),
      mode: "cors"
    })
    .then(res => {
      if (!res.ok) {
        console.log("サーバーエラー")
      }
    })
    return POST
  }