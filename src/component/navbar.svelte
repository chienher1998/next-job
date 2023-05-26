<script>
    import {isLoggedInStore, logOut} from '../utils/auth.js';
    </script>
    
    
    <nav class="flex justify-between items-center m-5">
        <a href="/" class="btn btn-ghost normal-case text-xl">Next-Job</a>
        <div>
            {#if $isLoggedInStore}
            <a on:click = {logOut} href="/" class="btn mx-10">Log Out</a>
            <a href="/jobs/new/" class="btn">Post Job</a>
            {:else}
            <a href="/users/new/" class="btn mx-10">Post Job</a>
            <a href="/users/login/" class="btn">Login</a>
            {/if}
        </div>
    </nav>
     