const form=document.getElementById('quote-form');
if(form){
    const status=document.getElementById('form-status');
    const params=new URLSearchParams(window.location.search);
    const requested=params.get('service');
    const selector=document.getElementById('service');
    if(requested&&selector){
        if([...selector.options].some(option=>option.value===requested))selector.value=requested
    }
    form.addEventListener('submit',event=>{event.preventDefault();
        if(!form.reportValidity())return;
        const data=new FormData(form);
        const subject=encodeURIComponent(`Quote request: ${data.get('service')}`);
        const body=encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\nGoal:\n${data.get('goal')||'Not provided'}`);
        status.textContent='Opening your email app with your quote request. Please send the message to complete your request.';
        window.location.href=`mailto:hello@novascalelab.com?subject=${subject}&body=${body}`
    })
}