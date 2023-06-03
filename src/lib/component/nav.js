export let darktheme = null;

if(window.matchMedia('(prefers-color-scheme: light)')){
    localStorage.setItem('theme', 'bumblebee')
}else if(window.matchMedia('(prefers-color-scheme: dark)')){
    localStorage.setItem('theme', 'dracula')
}


if (
    localStorage.getItem('theme') === 'dracula' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
) {
    darktheme = true;
} else {
    darktheme = false;
}