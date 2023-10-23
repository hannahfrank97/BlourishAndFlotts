<template>
    <div class="buttons">
    <div class="btn-hover color-9">
        {{ buttonText }}
    </div>
    </div>


</template>

<script>
export default {
    props: {
        buttonText: {
            type: String,
            required: true,
        },
    },
};

</script>

<style>
.buttons {
    display: flex;
    justify-content: center;
    line-height: 1.5;
    font-size: 1rem;
}

.btn-hover {
    width: 12rem;
    height: 4rem;
    color: #fff;
    cursor: pointer;
    text-align: center;
    border: none;
    background-size: 300% 100%;
    border-radius: 50px;
    transition: all 0.4s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-hover:hover {
    background-position: 100% 0;
    transition: all 0.4s ease-in-out;
}

.btn-hover:focus {
    outline: none;
}

.btn-hover.color-9 {
    background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
    box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
}

.button-text {
    display: inline-block;
    vertical-align: middle;
}

@media screen and (min-width: 330px) and (max-width: 768px) {

    .buttons {
        font-size: 0.7rem;
        margin: 0;
    }

    .btn-hover {
        width: 6.3rem;
        height: 2.2rem;
        margin: 0;

    }

}

@media screen and (min-width: 768px) and (max-width: 1024px) {

    .buttons {
        font-size: 0.7rem;
        margin: 0;
    }

    .btn-hover {
        width: 8rem;
        height: 2.5rem;
        margin: 0;

    }

}

@media screen and (min-width: 1025px) and (max-width: 1200px) {

      .buttons {
          font-size: 0.7rem;
          margin: 0;
      }

      .btn-hover {
          width: 8.2rem;
          height: 2.6rem;
          margin: 0;

      }
}

</style>