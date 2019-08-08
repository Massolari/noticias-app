<template>
    <StackLayout>
        <PullToRefresh height="90%" @refresh="refresh">
            <ListView android:layout_height="0dp" for="noticia in noticias" @itemTap="ler">
                <v-template>
                    <CardView elevation="10" margin="5">
                        <GridLayout rows="200, auto, auto" columns="*">
                            <Image :src="noticia.urlToImage" stretch="aspectFill" margin="10" row="0" />
                            <Label :text="noticia.title" class="info" textWrap="true" row="1" />
                        </GridLayout>
                    </CardView>
                </v-template>
            </ListView>
        </PullToRefresh>
        <GridLayout rows="*">
            <Button text="Mostrar mais" v-if="!carregando" @tap="mostrarMais" />
            <ActivityIndicator :busy="carregando" v-else class="activity-indicator" />
        </GridLayout>
    </StackLayout>
</template>

<script>
import { openUrl } from 'tns-core-modules/utils/utils';
import app from 'application';
import NoticiaTela from './NoticiaTela.vue';

export default {
    props: ['noticias', 'carregando'],
    methods: {
        ler(event) {
            const { url, title } = event.item;
            if (!url) {
                throw new Error("URL não recebida no método 'ler'");
            }
            if (!title) {
                throw new Error("Título não recebida no método 'ler'");
            }
            this.$navigateTo(NoticiaTela, {
                props: {
                    url,
                    titulo: title,
                }
            });
        },
        refresh(args) {
            this.$emit('refresh', args);
        },
        mostrarMais() {
            console.log('Botao mostrar mais clicado');
            this.$emit('mostrarMais')
        }
    }
}
</script>
